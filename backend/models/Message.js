// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   projectId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Project',
//     required: true
//   },
//   senderId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   receiverId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   message: {
//     type: String,
//     required: true
//   },
//   senderName: {
//     type: String,
//     required: true
//   },
//   read: {
//     type: Boolean,
//     default: false
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Message', messageSchema);

// models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      index: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      index: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    senderName: {
      type: String,
      required: true,
    },
    senderAvatar: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    messageType: {
      type: String,
      enum: ["text", "bank_details", "system"],
      default: "text",
    },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reactions: [{ userId: mongoose.Schema.Types.ObjectId, emoji: String }],
    isDirect: { type: Boolean, default: false }, // true = DM, false = project chat
  },
  {
    timestamps: true,
  },
);

messageSchema.index({ projectId: 1, createdAt: 1 });
messageSchema.index({ roomId: 1, createdAt: 1 });
messageSchema.pre("validate", function (next) {
  if (!this.projectId && !this.roomId) {
    return next(new Error("Either projectId or roomId is required"));
  }
  next();
});

module.exports = mongoose.model("Message", messageSchema);
