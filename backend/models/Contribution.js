const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ["unpaid", "processing", "paid"],
    default: "unpaid",
  },
  filesUnlocked: { type: Boolean, default: false },

  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "paid"],
    default: "pending",
  },
  files: [
    {
      filename: String,
      url: String,
    },
  ],
  clientFeedback: {
    type: String,
    maxlength: 500,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  paymentId: {
    type: String,
  },
  certificateGenerated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: Date,
  paidAt: Date,
});

module.exports = mongoose.model("Contribution", contributionSchema);
