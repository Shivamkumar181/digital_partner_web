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
    origin: "https://digital-partner.onrender.com",
    credentials: true,
  },
});

//Make io globally available so notify() helper can emit to users
global.io = io;

// Middleware
app.use(
  cors({
    origin: "https://digital-partner.onrender.com",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));



// Debug middleware to check CORS headers
app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  console.log('Request Method:', req.method);
  console.log('Request URL:', req.url);
  next();
});


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











// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const http = require("http");
// const socketIo = require("socket.io");
// const path = require("path");

// const app = express();
// const server = http.createServer(app);

// const io = socketIo(server, {
//   cors: {
//     origin: function (origin, callback) {
//       const allowedOrigins = [
//         'https://digital-partner.onrender.com'
//       ];
      
//       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
//   },
// });

// // Make io globally available
// global.io = io;

// // ✅ FIX 2: Express CORS - Multiple Origins Allow
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       const allowedOrigins = [
//         'https://digital-partner.onrender.com'
//       ];
      
//       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         console.log('Blocked origin:', origin); // Debugging
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files from public folder
// app.use(express.static(path.join(__dirname, 'public')));

// // ✅ FIX 3: Health check with /api prefix
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ 
//     status: 'ok', 
//     message: 'Backend is running!',
//     timestamp: new Date().toISOString()
//   });
// });

// // Routes
// const authRoutes = require("./routes/authRoutes");
// const projectRoutes = require("./routes/projectRoutes");
// const contributionRoutes = require("./routes/contributionRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const certificateRoutes = require("./routes/certificateRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const userRoutes = require("./routes/userRoutes");
// const notificationRoutes = require("./routes/notificationRoutes"); 

// app.use("/api/auth", authRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/contributions", contributionRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/certificates", certificateRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/notifications", notificationRoutes); 

// // Socket.io
// require("./config/socket")(io);

// // Error handling middleware
// app.use(require("./middleware/errorMiddleware"));

// // Database connection
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
//   console.log(`✅ Health check: https://digital-partner.onrender.com/api/health`);
// });