const Certificate = require("../models/Certificate");
const Contribution = require("../models/Contribution");
const Project = require("../models/Project");
const User = require("../models/User");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../utils/cloudinary");

// Generate certificate for approved contribution
exports.generateCertificate = async (req, res) => {
  try {
    const { contributionId } = req.body;

    // Check if contribution exists and is approved
    const contribution = await Contribution.findById(contributionId)
      .populate("freelancerId")
      .populate("projectId");

    if (!contribution) {
      return res.status(404).json({ message: "Contribution not found" });
    }

    if (contribution.status !== "approved" && contribution.status !== "paid") {
      return res.status(400).json({
        message:
          "Certificate can only be generated for approved or paid contributions",
      });
    }

    // Check if certificate already exists
    const existingCert = await Certificate.findOne({ contributionId });
    if (existingCert) {
      return res
        .status(400)
        .json({
          message: "Certificate already generated for this contribution",
        });
    }

    // Generate unique certificate ID
    const certificateId = `CERT-${uuidv4().slice(0, 8).toUpperCase()}`;

    // Generate QR Code with verification URL
    const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify-certificate/${certificateId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl);

    // Upload QR code to cloudinary (or use local storage)
    let qrCodeUrl = qrCodeDataUrl;
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      try {
        const qrUpload = await cloudinary.uploader.upload(qrCodeDataUrl, {
          folder: "certificates/qrcodes",
        });
        qrCodeUrl = qrUpload.secure_url;
      } catch (err) {
        console.log("Cloudinary upload failed, using data URL");
      }
    }

    // Create certificate
    const certificate = await Certificate.create({
      contributionId: contribution._id,
      freelancerId: contribution.freelancerId._id,
      projectId: contribution.projectId._id,
      certificateId,
      qrCode: qrCodeUrl,
      issuedAt: new Date(),
      verified: true,
    });

    res.status(201).json({
      ...certificate.toObject(),
      freelancerName: contribution.freelancerId.name,
      projectTitle: contribution.projectId.title,
      contributionDescription: contribution.description,
      contributionAmount: contribution.amount,
    });
  } catch (error) {
    console.error("Generate certificate error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all certificates for a freelancer
exports.getFreelancerCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ freelancerId: req.user._id })
      .populate("projectId", "title category")
      .populate({
        path: "contributionId",
        select: "description amount",
      })
      .sort("-issuedAt");

    res.json(certificates);
  } catch (error) {
    console.error("Get certificates error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all certificates for a project (client view)
exports.getProjectCertificates = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user is the client
    if (project.clientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const certificates = await Certificate.find({ projectId })
      .populate("freelancerId", "name email avatar")
      .populate("contributionId", "description amount");

    res.json(certificates);
  } catch (error) {
    console.error("Get project certificates error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify certificate publicly
exports.verifyCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      certificateId: req.params.certificateId,
    })
      .populate("freelancerId", "name")
      .populate("projectId", "title")
      .populate("contributionId", "description amount");

    if (!certificate) {
      return res.json({
        verified: false,
        message: "Certificate not found or invalid",
      });
    }

    res.json({
      verified: true,
      certificate: {
        id: certificate.certificateId,
        freelancerName: certificate.freelancerId?.name || "Anonymous",
        projectTitle: certificate.projectId?.title,
        contributionDescription: certificate.contributionId?.description,
        amount: certificate.contributionId?.amount,
        issuedAt: certificate.issuedAt,
        qrCode: certificate.qrCode,
      },
    });
  } catch (error) {
    console.error("Verify certificate error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
