const router = require("express").Router();
const Notification = require("../models/Notification");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);
  res.json(notifications);
});

router.put("/:id/read", protect, async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ success: true });
});

router.put("/read-all", protect, async (req, res) => {
  await Notification.updateMany({ userId: req.user._id }, { read: true });
  res.json({ success: true });
});

module.exports = router;
