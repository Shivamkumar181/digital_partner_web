const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Project title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Project description is required"],
    trim: true,
  },

  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  budget: {
    type: Number,
    required: [true, "Budget is required"],
    min: [0, "Budget cannot be negative"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: [
      "web development",
      "mobile development",
      "design",
      "writing",
      "marketing",
      "other",
    ],
  },
  skills: [
    {
      type: String,
      trim: true,
    },
  ],
  status: {
    type: String,
    enum: ["open", "in-progress", "completed", "cancelled"],
    default: "open",
  },
  deadline: {
    type: Date,
    required: [true, "Deadline is required"],
  },
  attachments: [
    {
      filename: String,
      url: String,
    },
  ],
  contributions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contribution",
    },
  ],
  totalPaid: {
    type: Number,
    default: 0,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  images: [
    {
      url: String,
      publicId: String,
    },
  ],
  currency: {
    type: String,
    default: "USD",
  },
});

// Add index for better query performance
projectSchema.index({ clientId: 1, status: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Project", projectSchema);
