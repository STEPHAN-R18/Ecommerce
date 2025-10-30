import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ add this line

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ add this line below your product routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes); // <---- important!

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
