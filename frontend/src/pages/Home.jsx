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
