import { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const ReviewContext = createContext();
let socket;

// Use API URL from .env
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
axios.defaults.baseURL = API_URL;

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState([]);
  const [productId, setProductId] = useState(null);

  // Connect to socket.io
  useEffect(() => {
    socket = io(API_URL, { transports: ["websocket", "polling"] });

    socket.on("connect", () => console.log("🟢 Socket connected:", socket.id));
    socket.on("disconnect", () => console.log("🔴 Socket disconnected"));

    return () => socket.disconnect();
  }, []);

  // Join product room
  const joinRoom = (id) => {
    setProductId(id);

    socket.off("reviewAdded");
    socket.off("reviewUpdated");
    socket.off("reviewDeleted");

    socket.emit("joinProductRoom", id);

    socket.on("reviewAdded", (review) => {
      if (review.productId === id) setReviews((prev) => [review, ...prev]);
    });

    socket.on("reviewUpdated", (review) => {
      if (review.productId === id)
        setReviews((prev) =>
          prev.map((r) => (r._id === review._id ? review : r))
        );
    });

    socket.on("reviewDeleted", (reviewId) => {
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    });
  };

  // Fetch reviews
  const fetchReviews = async (id) => {
    try {
      const res = await axios.get(`/api/reviews/${id}`);
      console.log("Fetched reviews:", res.data);
      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviews([]);
    }
  };

  // Add review (no token needed)
  const addReview = async (reviewData) => {
    try {
      const res = await axios.post("/api/reviews", reviewData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Review added:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error adding review:", err);
      alert("Failed to submit review — check backend.");
      return false;
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        setReviews,
        productId,
        joinRoom,
        fetchReviews,
        addReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export const useReviews = () => useContext(ReviewContext);
