const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");
const Contribution = require("../models/Contribution");
const Project = require("../models/Project");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Images only"), false);
  },
});

// POST /api/certificates/generate
router.post("/generate", protect, async (req, res) => {
  try {
    const {
      contributionId,
      companyName,
      companyLogo,
      clientName,
      contributorName,
    } = req.body;

    const contribution = await Contribution.findById(contributionId)
      .populate("projectId")
      .populate("freelancerId", "name email");

    if (!contribution)
      return res.status(404).json({ message: "Contribution not found" });
    if (contribution.status !== "approved" && contribution.status !== "paid") {
      return res
        .status(400)
        .json({ message: "Contribution must be approved first" });
    }

    // Check client owns this project
    if (
      contribution.projectId.clientId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Check already generated
    const existing = await Certificate.findOne({ contributionId });
    if (existing) {
      return res
        .status(400)
        .json({
          message: "Certificate already generated",
          certificateId: existing.certificateId,
        });
    }

    const certId = `DP-${uuidv4().slice(0, 8).toUpperCase()}`;

    // Get client info for company name
    const client = await User.findById(req.user._id).select("name");
    const finalCompanyName = companyName || client.name || "DigitalPartner";
    const finalClientName = clientName || client.name || "Client";
    const finalContributorName =
      contributorName || contribution.freelancerId.name;
    const finalLogo = companyLogo || null;

    const certificate = await Certificate.create({
      certificateId: certId,
      contributionId: contribution._id,
      projectId: contribution.projectId._id,
      freelancerId: contribution.freelancerId._id,
      issuedBy: req.user._id,
      companyName: finalCompanyName,
      clientName: finalClientName,
      contributorName: finalContributorName,
      companyLogo: finalLogo,
      issuedAt: new Date(),
    });

    // Mark contribution as having certificate
    await Contribution.findByIdAndUpdate(contributionId, {
      certificateGenerated: true,
    });

    res.json({
      certificateId: certId,
      freelancerName: contribution.freelancerId.name,
      clientName: finalClientName,
      contributorName: finalContributorName,
      projectTitle: contribution.projectId.title,
      companyName: finalCompanyName,
      companyLogo: finalLogo,
      issuedAt: certificate.issuedAt,
    });
  } catch (err) {
    console.error("Certificate generate error:", err);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/certificates/upload-logo — upload company logo
router.post(
  "/upload-logo",
  protect,
  upload.single("logo"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No file" });

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "digitalpartner/logos",
            resource_type: "image",
            transformation: [{ width: 200, height: 200, crop: "fit" }],
          },
          (err, result) => (err ? reject(err) : resolve(result)),
        );
        stream.end(req.file.buffer);
      });

      res.json({ url: result.secure_url });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

// GET /api/certificates/verify/:certificateId
router.get("/verify/:certificateId", async (req, res) => {
  try {
    const cert = await Certificate.findOne({
      certificateId: req.params.certificateId,
    })
      .populate("projectId", "title")
      .populate("freelancerId", "name avatar")
      .populate("contributionId", "description amount");

    if (!cert) return res.json({ verified: false });

    res.json({
      verified: true,
      certificate: {
        id: cert.certificateId,
        freelancerName: cert.freelancerId?.name,
        projectTitle: cert.projectId?.title,
        contributionDescription: cert.contributionId?.description,
        amount: cert.contributionId?.amount,
        issuedAt: cert.issuedAt,
        companyName: cert.companyName,
        clientName: cert.clientName,
        contributorName: cert.contributorName,
        companyLogo: cert.companyLogo,
        qrCode: cert.qrCode,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/certificates/my-certificates
router.get("/my-certificates", protect, async (req, res) => {
  try {
    const certs = await Certificate.find({ freelancerId: req.user._id })
      .populate("projectId", "title")
      .populate("contributionId", "description amount")
      .sort({ issuedAt: -1 });

    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
