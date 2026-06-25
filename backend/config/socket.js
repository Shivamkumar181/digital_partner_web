const Message = require("../models/Message");

module.exports = (io) => {
  // Track online users: userId -> socketId
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("userOnline", (userId) => {
      if (!userId) return;
      onlineUsers.set(userId, socket.id);
      socket.userId = userId;
      // Personal room so notify() helper can target this user directly
      socket.join(`user_${userId}`);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });

    // Join a project chat room
    socket.on("joinRoom", ({ userId, projectId }) => {
      if (!projectId) return;
      const room = `project_${projectId}`;
      socket.join(room);
      socket.currentRoom = room;
      socket.userId = userId;
      if (userId) {
        onlineUsers.set(userId, socket.id);
        socket.join(`user_${userId}`);
      }
      console.log(`User ${userId} joined room ${room}`);
    });

    //  Join a Direct Message room
    socket.on("joinDirect", ({ roomId, userId }) => {
      if (!roomId) return;
      socket.join(`dm_${roomId}`);
      if (userId) {
        onlineUsers.set(userId, socket.id);
        socket.join(`user_${userId}`);
      }
      console.log(`User ${userId} joined DM room dm_${roomId}`);
    });

    //  Send project room message — save to DB then broadcast
    socket.on("sendMessage", async (data) => {
      try {
        const { projectId, senderId, message, senderName, senderAvatar } = data;
        if (!projectId || !senderId || !message?.trim()) return;

        const newMessage = await Message.create({
          projectId,
          senderId,
          message: message.trim(),
          senderName,
          senderAvatar: senderAvatar || null,
          readBy: [senderId],
          createdAt: new Date(),
        });

        const populated = await Message.findById(newMessage._id).populate(
          "senderId",
          "name avatar",
        );

        const messageToSend = {
          _id: populated._id,
          projectId: populated.projectId,
          senderId: populated.senderId?._id || senderId,
          senderName: populated.senderId?.name || senderName,
          senderAvatar: populated.senderId?.avatar || senderAvatar,
          message: populated.message,
          readBy: populated.readBy,
          createdAt: populated.createdAt,
        };

        io.to(`project_${projectId}`).emit("receiveMessage", messageToSend);
      } catch (err) {
        console.error("sendMessage error:", err);
        socket.emit("messageError", { error: "Failed to send message" });
      }
    });

    //  Send Direct Message — save to DB then broadcast to DM room
    socket.on("sendDirectMessage", async (data) => {
      try {
        const {
          roomId,
          senderId,
          receiverId,
          message,
          senderName,
          senderAvatar,
        } = data;
        if (!roomId || !senderId || !message?.trim()) return;

        const newMessage = await Message.create({
          roomId,
          senderId,
          receiverId,
          message: message.trim(),
          senderName,
          senderAvatar: senderAvatar || null,
          isDirect: true,
          readBy: [senderId],
          createdAt: new Date(),
        });

        const messageToSend = {
          _id: newMessage._id,
          roomId,
          senderId,
          receiverId,
          senderName,
          senderAvatar,
          message: newMessage.message,
          readBy: newMessage.readBy,
          createdAt: newMessage.createdAt,
        };

        io.to(`dm_${roomId}`).emit("receiveDirectMessage", messageToSend);
      } catch (err) {
        console.error("sendDirectMessage error:", err);
        socket.emit("messageError", { error: "Failed to send message" });
      }
    });

    // Typing indicator
    socket.on("typing", ({ roomId, userId, userName, isDirect }) => {
      const room = isDirect ? `dm_${roomId}` : `project_${roomId}`;
      socket.to(room).emit("userTyping", { userId, userName });
    });

    socket.on("stopTyping", ({ roomId, userId, isDirect }) => {
      const room = isDirect ? `dm_${roomId}` : `project_${roomId}`;
      socket.to(room).emit("userStoppedTyping", { userId });
    });

    // Mark messages as read
    socket.on("markRead", async ({ roomId, userId, messageIds, isDirect }) => {
      try {
        if (!messageIds?.length) return;
        await Message.updateMany(
          { _id: { $in: messageIds } },
          { $addToSet: { readBy: userId } },
        );
        const room = isDirect ? `dm_${roomId}` : `project_${roomId}`;
        socket.to(room).emit("messagesRead", { userId, messageIds });
      } catch (err) {
        console.error("markRead error:", err);
      }
    });

    // Leave project room
    socket.on("leaveRoom", ({ projectId }) => {
      if (projectId) socket.leave(`project_${projectId}`);
    });

    // Disconnect
    socket.on("disconnect", () => {
      if (socket.userId) {
        onlineUsers.delete(socket.userId);
        io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      }
      console.log("Socket disconnected:", socket.id);
    });
  });
};
