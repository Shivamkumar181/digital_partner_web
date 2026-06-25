const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const Project = require("../models/Project");
const { protect } = require("../middleware/authMiddleware");


router.get("/chats", protect, async (req, res) => {
  try {
  
    let projectIds = [];

    if (req.user.role === "client") {
      const projects = await Project.find({ clientId: req.user._id }).select(
        "_id title",
      );
      projectIds = projects.map((p) => ({ id: p._id, title: p.title }));
    } else {
      
      const Contribution = require("../models/Contribution");
      const contributions = await Contribution.find({
        freelancerId: req.user._id,
      })
        .populate("projectId", "title")
        .distinct("projectId");

      const projects = await Project.find({
        _id: { $in: contributions },
      }).select("_id title");
      projectIds = projects.map((p) => ({ id: p._id, title: p.title }));
    }

    // Get last message for each project
    const chats = await Promise.all(
      projectIds.map(async (proj) => {
        const lastMessage = await Message.findOne({ projectId: proj.id })
          .sort({ createdAt: -1 })
          .populate("senderId", "name avatar");

        return {
          projectId: proj.id,
          projectTitle: proj.title,
          lastMessage: lastMessage
            ? {
                message: lastMessage.message,
                senderName:
                  lastMessage.senderId?.name || lastMessage.senderName,
                createdAt: lastMessage.createdAt,
              }
            : null,
        };
      }),
    );

    res.json(chats.filter((c) => c !== null));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start or get a DM conversation between two users
router.post("/direct", protect, async (req, res) => {
  try {
    const { receiverId } = req.body;
    if (!receiverId)
      return res.status(400).json({ message: "receiverId is required" });
    const roomId = [req.user._id.toString(), receiverId].sort().join("_");
    const messages = await Message.find({ roomId, isDirect: true })
      .populate("senderId", "name avatar")
      .sort({ createdAt: 1 });
    res.json({ roomId, messages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all DM conversations for current user
router.get("/direct/chats", protect, async (req, res) => {
  const userId = req.user._id.toString();
  const rooms = await Message.aggregate([
    { $match: { isDirect: true, roomId: { $regex: userId } } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$roomId",
        lastMessage: { $first: "$$ROOT" },
        count: { $sum: 1 },
      },
    },
  ]);
  res.json(rooms);
});

// GET /api/chat/:projectId — fetch messages for a project
router.get("/:projectId", protect, async (req, res) => {
  try {
    const messages = await Message.find({ projectId: req.params.projectId })
      .populate("senderId", "name avatar")
      .sort({ createdAt: 1 })
      .limit(100);

    const formatted = messages.map((m) => ({
      _id: m._id,
      projectId: m.projectId,
      senderId: m.senderId?._id || m.senderId,
      senderName: m.senderId?.name || m.senderName,
      senderAvatar: m.senderId?.avatar || m.senderAvatar,
      message: m.message,
      createdAt: m.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
