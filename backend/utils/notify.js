const Notification = require("../models/Notification");

const notify = async ({ userId, type, title, message, link }) => {
  const n = await Notification.create({ userId, type, title, message, link });
  // Emit via socket if available
  if (global.io) global.io.to(`user_${userId}`).emit("notification", n);
  return n;
};
module.exports = notify;
