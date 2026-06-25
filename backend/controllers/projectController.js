const Project = require("../models/Project");
const User = require("../models/User");

exports.createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      budget,
      currency,
      category,
      skills,
      deadline,
      images,
    } = req.body;

    let skillsArray = [];
    if (skills) {
      if (Array.isArray(skills)) {
        skillsArray = skills;
      } else if (typeof skills === "string") {
        skillsArray = skills.split(",").map((s) => s.trim());
      }
    }

    // Validate required fields
    if (!title || !description || !budget || !category || !deadline) {
      return res.status(400).json({
        message:
          "Missing required fields: title, description, budget, category, deadline are required",
      });
    }

    const normalizedImages = (
      Array.isArray(images) ? images : images ? [images] : []
    )
      .map((img) => {
        if (typeof img === "string") {
          return { url: img };
        }

        if (img && typeof img === "object" && img.url) {
          return {
            url: img.url,
            publicId: img.publicId || "",
          };
        }

        return null;
      })
      .filter(Boolean);

    // Create project with proper data
    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      budget: Number(budget),
      currency: currency || "USD",
      category: category,
      skills: skillsArray,
      images: normalizedImages,
      deadline: new Date(deadline),
      clientId: req.user._id,
      status: "open",
      totalPaid: 0,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({
      message: "Server error while creating project",
      error: error.message,
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const { status, category, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const projects = await Project.find(query)
      .populate("clientId", "name email avatar rating")
      .sort("-createdAt");

    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("clientId", "name email avatar rating")
      .populate({
        path: "contributions",
        populate: {
          path: "freelancerId",
          select: "name email avatar rating",
        },
      });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Get project by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.clientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    res.json(updatedProject);
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.clientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await project.deleteOne();
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
