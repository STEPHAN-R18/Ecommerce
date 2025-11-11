import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";
import "../components/FilterSidebar.css";
import FilterSidebar from "../components/FilterSidebar";
import { useFilters } from "../context/FilterContext";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { toast } from "react-toastify";
import { getSocket } from "../socket";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: [],
    priceMin: "",
    priceMax: "",
    rating: "",
    sortBy: "",
    search: "",
  });
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, closeFilters } = useFilters();

  // Load wishlist from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  // ✅ Add/Remove Wishlist
  const toggleWishlist = (product) => {
    const productId = product._id || product.id;
    const exists = wishlist.some((p) => (p._id || p.id) === productId);

    let updated;
    if (exists) {
      updated = wishlist.filter((p) => (p._id || p.id) !== productId);
      toast.info("💔 Removed from Wishlist");
    } else {
      updated = [...wishlist, product];
      toast.success("❤️ Added to Wishlist");
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const isInWishlist = (id) =>
    wishlist.some((p) => (p._id || p.id) === id);

  // ✅ Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.categories.length)
        params.set("category", filters.categories.join(","));
      if (filters.search) params.set("search", filters.search);
      if (filters.priceMin !== "") params.set("priceMin", filters.priceMin);
      if (filters.priceMax !== "") params.set("priceMax", filters.priceMax);
      if (filters.rating) params.set("rating", filters.rating);
      if (filters.sortBy) params.set("sort", filters.sortBy);

      const res = await axios.get(
        `http://localhost:5000/api/products${
          params.toString() ? "?" + params.toString() : ""
        }`
      );
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error loading products:", err);
      toast.error("⚠️ Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("stockUpdate", ({ productId, stock }) => {
      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? { ...p, stock } : p))
      );
      toast.info(`📦 Stock updated for a product!`);
    });

    return () => socket.off("stockUpdate");
  }, []);

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("🔒 Please login to continue!");
      navigate("/login");
      return;
    }
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const handleBuyNow = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("🔒 Please login to continue!");
      navigate("/login");
      return;
    }
    handleAddToCart(product);
    toast.info(`Proceeding to payment for ${product.name} 💳`);
    navigate("/payment");
  };

  return (
    <div className="home-container">
      <FilterSidebar
        open={sidebarOpen}
        onClose={closeFilters}
        onApply={(newFilters) => {
          setFilters((prev) => ({ ...prev, ...newFilters }));
          closeFilters();
        }}
        onClear={() =>
          setFilters({
            categories: [],
            priceMin: "",
            priceMax: "",
            rating: "",
            sortBy: "",
            search: "",
          })
        }
        initialFilters={filters}
      />

      <header className="hero-section">
        <div className="hero-text">
          <h1>Welcome to ShopSmart 🛍️</h1>
          <p>Discover our curated collection of the latest products.</p>
        </div>
      </header>

      <section className="product-list">
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product._id || product.id} className="product-card">
              <img
                src={product.image || "https://via.placeholder.com/250"}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">₹{product.price}</p>
                <p className={product.stock > 0 ? "in-stock" : "out-stock"}>
                  {product.stock > 0
                    ? `In Stock (${product.stock})`
                    : "Out of Stock"}
                </p>

                <div className="button-group">
                  <button
                    className="btn-buy"
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy Now
                  </button>
                  <button
                    className="btn-addcart"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>

                  <button
                    className={`heart-btn ${
                      isInWishlist(product._id || product.id) ? "active" : ""
                    }`}
                    onClick={() => toggleWishlist(product)}
                  >
                    ❤️
                  </button>

                  <button
                    className="btn-viewdetails"
                    onClick={() => navigate(`/product/${product._id || product.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No products found</p>
        )}
      </section>
    </div>
  );
}
