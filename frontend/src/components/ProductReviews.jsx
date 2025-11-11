import { useEffect } from "react";
import { useReviews } from "../context/ReviewContext";
import ReviewForm from "./ReviewForm";

export default function ProductReviews({ productId, token, user }) {
  const { reviews, fetchReviews, joinRoom } = useReviews();

  // ✅ Fetch + join room for real-time updates
  useEffect(() => {
    if (productId) {
      fetchReviews(productId);
      joinRoom(productId);
    }
  }, [productId]);

  return (
    <div className="reviews-section">
      <h2>Customer Reviews</h2>

      {/* ✅ Review Form */}
      {user && token ? (
        <ReviewForm productId={productId} />
      ) : (
        <p>Please log in to write a review.</p>
      )}

      {/* ✅ Show Reviews */}
      {reviews && reviews.length > 0 ? (
        <div className="review-list">
          {reviews.map((r) => (
            <div key={r._id} className="review-card">
              <div className="review-header">
                <strong>{r.user?.name || "Anonymous"}</strong>
                <span>{r.rating}⭐</span>
              </div>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
}
