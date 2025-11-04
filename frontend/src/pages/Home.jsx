import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";
import "../components/FilterSidebar.css";
import FilterSidebar from "../components/FilterSidebar";
import { useFilters } from "../context/FilterContext"; // ✅ Context

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    priceMin: "",
    priceMax: "",
    rating: "",
    sortBy: "",
    search: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, closeFilters } = useFilters(); // ✅ from context

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.categories.length) params.set("category", filters.categories.join(","));
    if (filters.priceMin !== "") params.set("priceMin", filters.priceMin);
    if (filters.priceMax !== "") params.set("priceMax", filters.priceMax);
    if (filters.rating) params.set("rating", filters.rating);
    if (filters.sortBy) params.set("sort", filters.sortBy);
    if (filters.search) params.set("search", filters.search);
    navigate(`/?${params.toString()}`, { replace: true });

    fetchProducts();
  }, [filters]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get("search") || "";
    setFilters((prev) => ({ ...prev, search: searchTerm }));
  }, [location.search]);

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.categories.length) params.set("category", filters.categories.join(","));
      if (filters.search) params.set("search", filters.search);
      if (filters.priceMin !== "") params.set("priceMin", filters.priceMin);
      if (filters.priceMax !== "") params.set("priceMax", filters.priceMax);
      if (filters.rating) params.set("rating", filters.rating);
      if (filters.sortBy) params.set("sort", filters.sortBy);

      const url =
        params.toString().length > 0
          ? `http://localhost:5000/api/products?${params.toString()}`
          : `http://localhost:5000/api/products`;

      const res = await axios.get(url);
      let items = res.data || [];

      if (filters.priceMin !== "" || filters.priceMax !== "") {
        const min = Number(filters.priceMin) || 0;
        const max = filters.priceMax !== "" ? Number(filters.priceMax) : Infinity;
        items = items.filter((p) => {
          const price = Number(p.price) || 0;
          return price >= min && price <= max;
        });
      }

      if (filters.rating) {
        const r = Number(filters.rating);
        items = items.filter((p) => (p.rating ? Number(p.rating) >= r : true));
      }

      if (filters.sortBy === "price-asc") items.sort((a, b) => a.price - b.price);
      if (filters.sortBy === "price-desc") items.sort((a, b) => b.price - a.price);
      if (filters.sortBy === "newest")
        items.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

      setProducts(items);
    } catch (err) {
      console.error("Error loading products:", err);
      setProducts([]);
    }
  };

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to continue!");
      navigate("/login");
      return;
    }
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/cart");
  };

  const handleBuyNow = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to continue!");
      navigate("/login");
      return;
    }
    navigate("/payment");
  };

  return (
    <div className="home-container">
      {/* ✅ Sidebar controlled by context */}
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="hero-text">
            <h1>Welcome to ShopSmart 🛍️</h1>
            <p>Discover our curated collection of the latest products.</p>
          </div>
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
                    Buy Now
                  </button>
                  <button className="btn-addcart" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                  <button
                    className="btn-viewdetails"
                    onClick={() => navigate(`/product/${product._id}`)}
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
