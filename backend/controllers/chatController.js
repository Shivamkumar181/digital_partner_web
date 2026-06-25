const Message = require("../models/Message");
const Project = require("../models/Project");

exports.getMessages = async (req, res) => {
  try {
    const { projectId } = req.params;

    const messages = await Message.find({ projectId }).sort("createdAt");

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserChats = async (req, res) => {
  try {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [{ senderId: req.user._id }, { receiverId: req.user._id }],
        },
      },
      {
        $group: {
          _id: "$projectId",
          lastMessage: { $last: "$$ROOT" },
        },
      },
    ]).sort({ "lastMessage.createdAt": -1 });

    const populatedChats = await Promise.all(
      messages.map(async (chat) => {
        const project = await Project.findById(chat._id).select("title");
        return {
          projectId: chat._id,
          projectTitle: project.title,
          lastMessage: chat.lastMessage,
        };
      }),
    );

    res.json(populatedChats);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await Message.updateMany(
      {
        projectId: req.params.projectId,
        receiverId: req.user._id,
        read: false,
      },
      { read: true },
    );

    res.json({ message: "Messages marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
