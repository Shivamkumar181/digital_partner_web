const User = require("../models/User");
const Project = require("../models/Project");
const Contribution = require("../models/Contribution");
const Certificate = require("../models/Certificate");
const cloudinary = require("../utils/cloudinary");

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, skills } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills.split(",").map((skill) => skill.trim());

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      skills: user.skills,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update avatar
exports.updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
    });

    const user = await User.findById(req.user._id);
    user.avatar = result.secure_url;
    await user.save();

    res.json({ avatar: user.avatar });
  } catch (error) {
    console.error("Avatar upload error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add portfolio item
exports.addPortfolio = async (req, res) => {
  try {
    const { title, description, link } = req.body;

    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "portfolio",
      });
      imageUrl = result.secure_url;
    }

    const user = await User.findById(req.user._id);
    user.portfolio.push({
      title,
      description,
      link,
      image: imageUrl,
    });

    await user.save();
    res.json(user.portfolio);
  } catch (error) {
    console.error("Add portfolio error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user profile by ID
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -bankDetails",
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get dashboard statistics
exports.getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.role === "client") {
      const projects = await Project.find({ clientId: req.user._id });
      const activeProjects = projects.filter(
        (p) => p.status === "open" || p.status === "in-progress",
      ).length;
      const completedProjects = projects.filter(
        (p) => p.status === "completed",
      ).length;
      const totalSpent = projects.reduce(
        (sum, p) => sum + (p.totalPaid || 0),
        0,
      );

      const contributions = await Contribution.find({
        projectId: { $in: projects.map((p) => p._id) },
      });

      const recentProjects = projects
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5);

      res.json({
        activeProjects,
        completedProjects,
        totalSpent,
        contributionsReceived: contributions.length,
        recentProjects,
        recentActivity: recentProjects.map((p) => ({
          description: `Created project "${p.title}"`,
          date: new Date(p.createdAt).toLocaleDateString(),
        })),
      });
    } else {
      const contributions = await Contribution.find({
        freelancerId: req.user._id,
      }).populate("projectId", "title");
      const approved = contributions.filter((c) => c.status === "approved");
      const pending = contributions.filter((c) => c.status === "pending");
      const paid = contributions.filter((c) => c.status === "paid");
      const totalEarnings = paid.reduce((sum, c) => sum + c.amount, 0);

      const certificates = await Certificate.find({
        freelancerId: req.user._id,
      });

      const recentContributions = contributions
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5);

      res.json({
        totalEarnings,
        approvedContributions: approved.length,
        pendingContributions: pending.length,
        certificatesCount: certificates.length,
        recentContributions,
        skills: user.skills,
        recentActivity: recentContributions.map((c) => ({
          description: `Submitted contribution to "${c.projectId?.title}" for $${c.amount}`,
          date: new Date(c.createdAt).toLocaleDateString(),
        })),
      });
    }
  } catch (error) {
    console.error("Error in getUserStats:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
