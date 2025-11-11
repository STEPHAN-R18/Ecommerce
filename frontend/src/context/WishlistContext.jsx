import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage initially
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  // Update localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    // Emit a custom event to notify other components (optional)
    window.dispatchEvent(new Event("wishlistUpdated"));
  }, [wishlist]);

  const addToWishlist = (item) => {
    setWishlist((prev) => {
      if (prev.find((p) => (p._id || p.id) === (item._id || item.id))) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => (item._id || item.id) !== id)
    );
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => (item._id || item.id) === id);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Hook for easier usage
export const useWishlist = () => useContext(WishlistContext);
