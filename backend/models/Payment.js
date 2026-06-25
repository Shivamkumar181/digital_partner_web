const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema(
  {
    contributionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contribution",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "paid", "failed"],
      default: "pending",
    },
    stripePaymentId: String,
    paidAt: Date,
  },
  { timestamps: true },
);
module.exports = mongoose.model("Payment", paymentSchema);
