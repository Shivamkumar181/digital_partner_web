const router = require("express").Router();
const Payment = require("../models/Payment");
const Contribution = require("../models/Contribution");
const Project = require("../models/Project");
const notify = require("../utils/notify");
const { protect } = require("../middleware/authMiddleware");

router.get("/pending", protect, async (req, res) => {
  try {
    if (req.user.role !== "client")
      return res.status(403).json({ message: "Clients only" });

    const projects = await Project.find({ clientId: req.user._id }).select(
      "_id",
    );
    const projectIds = projects.map((project) => project._id);

    const contributions = await Contribution.find({
      projectId: { $in: projectIds },
      status: { $in: ["approved", "paid"] },
    })
      .populate("freelancerId", "name avatar bankDetails")
      .populate("projectId", "title")
      .sort({ updatedAt: -1, createdAt: -1 });

    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/my-earnings", protect, async (req, res) => {
  try {
    if (req.user.role !== "freelancer")
      return res.status(403).json({ message: "Freelancers only" });

    const contributions = await Contribution.find({
      freelancerId: req.user._id,
      status: { $in: ["approved", "paid"] },
    })
      .populate("projectId", "title _id")
      .populate("freelancerId", "name avatar")
      .sort({ updatedAt: -1, createdAt: -1 });

    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const markContributionPaid = async (
  contributionId,
  clientId,
  amountOverride,
) => {
  const contribution = await Contribution.findById(contributionId)
    .populate("projectId")
    .populate("freelancerId");
  if (!contribution)
    return { error: { code: 404, message: "Contribution not found" } };
  if (
    !contribution.projectId ||
    contribution.projectId.clientId.toString() !== clientId.toString()
  ) {
    return { error: { code: 403, message: "Not authorized" } };
  }
  if (contribution.status !== "approved") {
    return {
      error: {
        code: 400,
        message: "Contribution must be approved before payment",
      },
    };
  }

  const paymentAmount = Number(amountOverride || contribution.amount);
  const payment = await Payment.create({
    contributionId: contribution._id,
    amount: paymentAmount,
    projectId: contribution.projectId._id,
    freelancerId: contribution.freelancerId._id,
    clientId,
    status: "paid",
    paidAt: new Date(),
  });

  contribution.status = "paid";
  contribution.paymentStatus = "paid";
  contribution.paymentId = String(payment._id);
  contribution.filesUnlocked = true;
  contribution.paidAt = new Date();
  await contribution.save();

  await notify({
    userId: contribution.freelancerId._id,
    type: "payment_received",
    title: "Payment received",
    message: `$${paymentAmount} paid for your contribution on "${contribution.projectId.title}"`,
    link: `/projects/${contribution.projectId._id}`,
  });

  return { payment, contribution };
};

router.post("/pay", protect, async (req, res) => {
  try {
    if (req.user.role !== "client")
      return res.status(403).json({ message: "Clients only" });
    const result = await markContributionPaid(
      req.body.contributionId,
      req.user._id,
    );
    if (result.error)
      return res
        .status(result.error.code)
        .json({ message: result.error.message });
    res.json({
      message: "Payment recorded",
      payment: result.payment,
      contribution: result.contribution,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/mark-paid", protect, async (req, res) => {
  try {
    if (req.user.role !== "client")
      return res.status(403).json({ message: "Clients only" });
    const result = await markContributionPaid(
      req.body.contributionId,
      req.user._id,
      req.body.amount,
    );
    if (result.error)
      return res
        .status(result.error.code)
        .json({ message: result.error.message });
    res.json({
      payment: result.payment,
      message: "Payment marked and files unlocked",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/history", protect, async (req, res) => {
  try {
    const field = req.user.role === "freelancer" ? "freelancerId" : "clientId";
    const payments = await Payment.find({ [field]: req.user._id })
      .populate("contributionId projectId freelancerId clientId")
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
