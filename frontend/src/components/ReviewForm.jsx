import { useState } from "react";
import { useReviews } from "../context/ReviewContext";

export default function ReviewForm({ productId }) {
  const { addReview, fetchReviews } = useReviews();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = { productId, rating, comment };
    console.log("📤 Submitting review:", reviewData);

    setLoading(true);
    try {
      const result = await addReview(reviewData);
      console.log("✅ Review API response:", result);

      if (result) {
        setComment("");
        setRating(5);
        fetchReviews(productId); // reload reviews
      } else {
        alert("Failed to submit review. Check backend route or console.");
      }
    } catch (err) {
      console.error("❌ Error submitting review:", err);
      alert(err.response?.data?.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3>Leave a Review</h3>

      <label>Rating</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        required
      >
        <option value={5}>⭐⭐⭐⭐⭐</option>
        <option value={4}>⭐⭐⭐⭐</option>
        <option value={3}>⭐⭐⭐</option>
        <option value={2}>⭐⭐</option>
        <option value={1}>⭐</option>
      </select>

      <label>Comment</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
