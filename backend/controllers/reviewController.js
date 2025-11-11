// server/controllers/reviewController.js
import Review from "../models/Review.js";

// 📦 GET reviews by productId
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➕ POST a new review
export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const newReview = new Review({
      productId,
      userId: req.user.id,
      userName: req.user.name,
      rating,
      comment,
    });
    await newReview.save();

    if (req.io) req.io.to(productId).emit("reviewAdded", newReview);

    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✏️ UPDATE a review
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    review.rating = req.body.rating ?? review.rating;
    review.comment = req.body.comment ?? review.comment;
    await review.save();

    if (req.io) req.io.to(review.productId.toString()).emit("reviewUpdated", review);

    res.json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ❌ DELETE a review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await review.remove();
    if (req.io) req.io.to(review.productId.toString()).emit("reviewDeleted", review._id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
