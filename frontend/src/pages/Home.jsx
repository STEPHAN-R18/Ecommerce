import { useEffect, useState } from "react";
import { getProducts } from "../api";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to ShopSmart 🛍️</h1>
        <p>Discover our curated collection of the latest products</p>
        <Link to="/add-product" className="btn-primary">
          + Add New Product
        </Link>
      </header>

      <section className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image || "https://via.placeholder.com/250"}
                alt={product.name}
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <Link to={`/product/${product._id}`} className="btn-secondary">
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No products available</p>
        )}
      </section>
    </div>
  );
}
