import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// ✅ POST /api/reviews - create a new review
router.post("/", async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newReview = new Review({ productId, rating, comment });
    const savedReview = await newReview.save();

    console.log("✅ Review saved:", savedReview);
    res.status(201).json(savedReview);
  } catch (err) {
    console.error("❌ Error saving review:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET /api/reviews/:productId - fetch reviews
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    console.error("❌ Error fetching reviews:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
