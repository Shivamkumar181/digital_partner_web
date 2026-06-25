require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

// dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  },
});

//Make io globally available so notify() helper can emit to users
global.io = io;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));


// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Backend is running!',
    timestamp: new Date().toISOString()
  });
});




// Routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const contributionRoutes = require("./routes/contributionRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes"); 

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contributions", contributionRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes); 

// Socket.io
require("./config/socket")(io);

// Error handling middleware
app.use(require("./middleware/errorMiddleware"));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
   console.log(`Health check: http://localhost:${PORT}/health`);
});
