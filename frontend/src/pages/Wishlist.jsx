import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="wishlist-page">
      <h2>❤️ Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="empty-text">No items in your wishlist yet.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div key={product._id || product.id} className="wishlist-card">
              <img
                src={product.image || "https://via.placeholder.com/250"}
                alt={product.name}
                className="wishlist-image"
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>

              <div className="wishlist-buttons">
                <button
                  onClick={() => navigate(`/product/${product._id || product.id}`)}
                  className="btn-view"
                >
                  View
                </button>
                <button
                  onClick={() => removeFromWishlist(product._id || product.id)}
                  className="btn-remove"
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
