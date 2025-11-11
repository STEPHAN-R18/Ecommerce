import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import adminRoutes from "./routes/admin.js";

import productRoutes from "./routes/products.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/payment.js";
import reviewRoutes from "./routes/reviews.js";
import orderRoutes from "./routes/orders.js";

const app = express();
const server = http.createServer(app);

// ✅ Allowed frontend URLs
const allowedOrigins = [
  "https://ecommerce-frontend-m28r.onrender.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Socket.IO setup
export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

// ✅ Attach io globally to all requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ Register routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Attach io to admin routes (explicit for clarity)
app.use("/api/admin", (req, res, next) => {
  req.io = io;
  next();
}, adminRoutes);

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully ✅");
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Socket.IO Connection
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  // 🟣 User joins order room for live tracking
  socket.on("joinOrderRoom", ({ orderId }) => {
    if (orderId) {
      socket.join(orderId.toString());
      console.log(`📦 Socket ${socket.id} joined order room ${orderId}`);
    }
  });

  socket.on("leaveOrderRoom", ({ orderId }) => {
    if (orderId) {
      socket.leave(orderId.toString());
      console.log(`🚪 Socket ${socket.id} left order room ${orderId}`);
    }
  });

  // 👑 Admin joins admin room for live updates
  socket.on("joinAdminRoom", () => {
    socket.join("adminRoom");
    console.log(`👑 Admin ${socket.id} joined adminRoom`);
  });

  socket.on("leaveAdminRoom", () => {
    socket.leave("adminRoom");
    console.log(`🚪 Admin ${socket.id} left adminRoom`);
  });

  // 🟣 Product review room (optional)
  socket.on("joinProductRoom", (productId) => {
    socket.join(productId);
    console.log(`🟣 Joined product room: ${productId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
