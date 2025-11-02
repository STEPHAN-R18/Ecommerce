<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
const searchParams = new URLSearchParams(location.search);
const search = searchParams.get("search") || "";

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products?category=${category}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth", { state: { from: "/" } });
      return;
    }
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleBuyNow = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth", { state: { from: "/" } });
      return;
    }
    try {
      const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: product.price * 100,
        currency: "INR",
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "ShopSmart",
        description: product.name,
        order_id: data.id,
        handler: () => navigate("/payment"),
        theme: { color: "#121212" },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-text">
          <h1>Welcome to ShopSmart 🛍️</h1>
          <p>Find amazing deals across every category!</p>
        </div>

        {/* ✅ Category Filter */}
        <div className="category-filter">
          <label htmlFor="category" className="filter-label">
            <i className="fa fa-filter"></i> Filter by Category
          </label>
          <select
            id="category"
            className="category-select fancy"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="">🛍️ All Categories</option>
            <option value="electronics">💻 Electronics</option>
            <option value="fashion">👕 Fashion</option>
            <option value="books">📚 Books</option>
            <option value="home">🏠 Home & Kitchen</option>
          </select>
        </div>
      </header>

      <section className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image || "https://via.placeholder.com/250"}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">₹{product.price}</p>
                <div className="button-group">
                  <button className="btn-buy" onClick={() => handleBuyNow(product)}>
                    💳 Buy Now
                  </button>
                  <button className="btn-addcart" onClick={() => handleAddToCart(product)}>
                    ➕ Add to Cart
                  </button>
                  <button
                    className="btn-viewdetails"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    🔍 View Details
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
=======
// frontend/src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products?category=${category}&search=${search}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-text">
          <h1>Welcome to ShopSmart 🛍️</h1>
          <p>Discover our curated collection of the latest products.</p>
        </div>

        <div className="filters-inline">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="category-select"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="books">Books</option>
            <option value="home">Home & Kitchen</option>
          </select>
        </div>
      </header>

      <section className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image || "https://via.placeholder.com/250"}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
                <Link to={`/product/${product._id}`} className="btn-secondary">
                  View Details
                </Link>
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
>>>>>>> 72809590aa096b79a315a1fa15c7eceb21ddf3c4
