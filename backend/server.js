import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import productRoutes from "./routes/products.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/payment.js";

dotenv.config();

const app = express();

// ✅ Correct CORS setup
const allowedOrigins = [
  "https://ecommerce-frontend-m28r.onrender.com", // your deployed frontend
  "http://localhost:5173", // for local dev (optional)
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
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// ✅ Simple test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
