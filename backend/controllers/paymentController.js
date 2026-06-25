const Contribution = require("../models/Contribution");
const Project = require("../models/Project");
const User = require("../models/User");

exports.processPayment = async (req, res) => {
  try {
    const { contributionId, paymentMethod } = req.body;

    const contribution = await Contribution.findById(contributionId)
      .populate("freelancerId")
      .populate("projectId");

    if (!contribution) {
      return res.status(404).json({ message: "Contribution not found" });
    }

    if (contribution.status !== "approved") {
      return res.status(400).json({ message: "Contribution not approved yet" });
    }

    // Here you would integrate with actual payment gateway
    // For now, we'll simulate payment success
    contribution.status = "paid";
    contribution.paidAt = new Date();
    contribution.paymentId = `PAY-${Date.now()}`;
    await contribution.save();

    // Update freelancer earnings
    const freelancer = await User.findById(contribution.freelancerId._id);
    freelancer.totalEarnings += contribution.amount;
    freelancer.totalProjects += 1;
    await freelancer.save();

    // Update project total paid
    const project = await Project.findById(contribution.projectId._id);
    project.totalPaid += contribution.amount;
    await project.save();

    res.json({
      message: "Payment processed successfully",
      paymentId: contribution.paymentId,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateBankDetails = async (req, res) => {
  try {
    const { accountHolderName, accountNumber, bankName, ifscCode, upiId } =
      req.body;

    const user = await User.findById(req.user._id);
    user.bankDetails = {
      accountHolderName,
      accountNumber,
      bankName,
      ifscCode,
      upiId,
    };

    await user.save();
    res.json({ message: "Bank details updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const contributions = await Contribution.find({
      freelancerId: req.user._id,
      status: "paid",
    })
      .populate("projectId", "title")
      .sort("-paidAt");

    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
