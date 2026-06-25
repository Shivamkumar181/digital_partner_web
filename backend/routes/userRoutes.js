const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Project = require("../models/Project");
const Contribution = require("../models/Contribution");
const Certificate = require("../models/Certificate");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const bcrypt = require("bcryptjs");

// FIXED: Direct Cloudinary import with configuration
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "your_cloud_name_here",
  api_key: process.env.CLOUDINARY_API_KEY || "your_api_key_here",
  api_secret: process.env.CLOUDINARY_API_SECRET || "your_api_secret_here",
});

// Multer — memory storage (send buffer to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files allowed"), false);
  },
});

const uploadToCloudinary = (buffer, folder = "avatars") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "image",
        transformation: [
          { width: 400, height: 400, crop: "fill", gravity: "face" },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
    uploadStream.end(buffer);
  });
};

// GET /api/users/stats — dashboard stats
router.get("/stats", protect, async (req, res) => {
  try {
    if (req.user.role === "client") {
      const projects = await Project.find({ clientId: req.user._id });
      const projectIds = projects.map((p) => p._id);

      const contributions = await Contribution.find({
        projectId: { $in: projectIds },
      });
      const totalSpent = contributions
        .filter((c) => c.status === "paid" || c.status === "approved")
        .reduce((sum, c) => sum + (c.amount || 0), 0);

      const recentProjects = await Project.find({ clientId: req.user._id })
        .sort({ createdAt: -1 })
        .limit(5);

      res.json({
        activeProjects: projects.filter(
          (p) => p.status === "open" || p.status === "in-progress",
        ).length,
        totalSpent,
        contributionsReceived: contributions.length,
        completedProjects: projects.filter((p) => p.status === "completed")
          .length,
        recentProjects,
      });
    } else {
      const contributions = await Contribution.find({
        freelancerId: req.user._id,
      })
        .populate("projectId", "title _id")
        .sort({ createdAt: -1 });

      const totalEarnings = contributions
        .filter((c) => c.status === "paid")
        .reduce((sum, c) => sum + (c.amount || 0), 0);

      const certificates = await Certificate.find({
        freelancerId: req.user._id,
      });

      res.json({
        totalEarnings,
        approvedContributions: contributions.filter(
          (c) => c.status === "approved" || c.status === "paid",
        ).length,
        pendingContributions: contributions.filter(
          (c) => c.status === "pending",
        ).length,
        certificatesCount: certificates.length,
        recentContributions: contributions.slice(0, 5),
        skills: req.user.skills || [],
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/search?q= — search users by name
router.get("/search", protect, async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) return res.json([]);

    const users = await User.find({
      name: { $regex: q.trim(), $options: "i" },
      _id: { $ne: req.user._id },
    })
      .select("name avatar role bio")
      .limit(10);

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/profile/:userId — public profile
router.get("/profile/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "-password -bankDetails",
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    let profileData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      skills: user.skills,
      role: user.role,
      createdAt: user.createdAt,
    };

    if (user.role === "freelancer") {
      const contributions = await Contribution.find({ freelancerId: user._id })
        .populate("projectId", "title _id status category budget images")
        .sort({ createdAt: -1 });

      const approved = contributions.filter(
        (c) => c.status === "approved" || c.status === "paid",
      );
      const totalEarnings = contributions
        .filter((c) => c.status === "paid")
        .reduce((sum, c) => sum + (c.amount || 0), 0);

      const certificates = await Certificate.find({ freelancerId: user._id })
        .populate("projectId", "title")
        .sort({ issuedAt: -1 });

      const rated = contributions.filter((c) => c.rating);
      const avgRating =
        rated.length > 0
          ? rated.reduce((sum, c) => sum + c.rating, 0) / rated.length
          : null;

      profileData = {
        ...profileData,
        totalEarnings,
        approvedContributions: approved.length,
        certificatesCount: certificates.length,
        averageRating: avgRating,
        recentContributions: contributions,
        certificates,
      };
    } else {
      const projects = await Project.find({ clientId: user._id }).sort({
        createdAt: -1,
      });
      const totalSpent = projects.reduce((sum, p) => sum + (p.budget || 0), 0);

      profileData = {
        ...profileData,
        totalProjects: projects.length,
        totalSpent,
        recentProjects: projects,
      };
    }

    res.json(profileData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/users/profile — update profile
router.put("/profile", protect, async (req, res) => {
  try {
    const { name, bio, skills } = req.body;
    const skillsArray = skills
      ? skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio, skills: skillsArray },
      { new: true, runValidators: true },
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/users/avatar — upload avatar to Cloudinary
router.put("/avatar", protect, upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    // Delete old avatar from Cloudinary if exists
    const currentUser = await User.findById(req.user._id);
    if (currentUser && currentUser.avatarPublicId) {
      try {
        await cloudinary.uploader.destroy(currentUser.avatarPublicId);
      } catch (err) {
        console.log("Failed to delete old avatar:", err.message);
      }
    }

    // Upload new avatar
    const result = await uploadToCloudinary(
      req.file.buffer,
      "digitalpartner/avatars",
    );

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: result.secure_url, avatarPublicId: result.public_id },
      { new: true },
    ).select("-password");

    res.json({ avatar: updated.avatar, user: updated });
  } catch (err) {
    console.error("Avatar upload error:", err);
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/users/change-password
router.put("/change-password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    if (newPassword.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/search", protect, async (req, res) => {
  const q = req.query.q;
  if (!q) return res.json([]);
  const users = await User.find({
    $or: [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
    ],
    _id: { $ne: req.user._id },
  })
    .select("name email avatar role")
    .limit(10);
  res.json(users);
});

// Add this route to userRoutes.js
router.post(
  "/upload-project-image",
  protect,
  upload.single("avatar"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image provided" });
      }

      const result = await uploadToCloudinary(
        req.file.buffer,
        "digitalpartner/projects",
      );

      res.json({
        url: result.secure_url,
        publicId: result.public_id,
      });
    } catch (err) {
      console.error("Project image upload error:", err);
      res.status(500).json({ message: err.message });
    }
  },
);

module.exports = router;
