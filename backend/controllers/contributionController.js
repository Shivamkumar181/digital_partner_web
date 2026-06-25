const Contribution = require("../models/Contribution");
const Project = require("../models/Project");
const User = require("../models/User");

exports.submitContribution = async (req, res) => {
  try {
    const { projectId, description, amount } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.status !== "open") {
      return res
        .status(400)
        .json({ message: "Project is not accepting contributions" });
    }

    const contribution = await Contribution.create({
      projectId,
      freelancerId: req.user._id,
      description,
      amount,
      files: req.files
        ? req.files.map((file) => ({
            filename: file.originalname,
            url: file.path,
          }))
        : [],
    });

    res.status(201).json(contribution);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getProjectContributions = async (req, res) => {
  try {
    const contributions = await Contribution.find({
      projectId: req.params.projectId,
    }).populate("freelancerId", "name email avatar rating");
    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.reviewContribution = async (req, res) => {
  try {
    const { status, feedback, rating } = req.body;
    const contribution = await Contribution.findById(req.params.id);

    if (!contribution) {
      return res.status(404).json({ message: "Contribution not found" });
    }

    const project = await Project.findById(contribution.projectId);
    if (project.clientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    contribution.status = status;
    contribution.clientFeedback = feedback;
    if (rating) contribution.rating = rating;

    if (status === "approved") {
      contribution.approvedAt = new Date();
    }

    await contribution.save();

    res.json(contribution);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFreelancerContributions = async (req, res) => {
  try {
    const contributions = await Contribution.find({
      freelancerId: req.user._id,
    })
      .populate("projectId", "title budget category")
      .sort("-createdAt");
    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
