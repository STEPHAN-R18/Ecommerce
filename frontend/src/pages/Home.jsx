import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "../components/FilterSidebar.css";
import FilterSidebar from "../components/FilterSidebar";

export default function Home() {
  const [products, setProducts] = useState([]);
  // filter state
  const [filters, setFilters] = useState({
    categories: [], // array of category strings
    priceMin: "",
    priceMax: "",
    rating: "",
    sortBy: "", // 'price-asc', 'price-desc', 'newest'
    search: "", // (optional) in case you want to wire navbar search later
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch on mount and whenever filters change
    fetchProducts();
    // update URL query (so user can share/bookmark)
    const params = new URLSearchParams();
    if (filters.categories.length) params.set("category", filters.categories.join(","));
    if (filters.priceMin !== "") params.set("priceMin", filters.priceMin);
    if (filters.priceMax !== "") params.set("priceMax", filters.priceMax);
    if (filters.rating) params.set("rating", filters.rating);
    if (filters.sortBy) params.set("sort", filters.sortBy);
    if (filters.search) params.set("search", filters.search);
    navigate(`/?${params.toString()}`, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchProducts = async () => {
    try {
      // Build query params for backend call
      const params = new URLSearchParams();
      // If user selected one or multiple categories, backend supports regex on 'category'
      if (filters.categories.length) params.set("category", filters.categories.join(","));
      if (filters.search) params.set("search", filters.search);
      // We'll pass price filters as min/max (backend can be extended to handle these)
      if (filters.priceMin !== "") params.set("priceMin", filters.priceMin);
      if (filters.priceMax !== "") params.set("priceMax", filters.priceMax);
      if (filters.rating) params.set("rating", filters.rating);
      if (filters.sortBy) params.set("sort", filters.sortBy);

      const url =
        params.toString().length > 0
          ? `http://localhost:5000/api/products?${params.toString()}`
          : `http://localhost:5000/api/products`;
      const res = await axios.get(url);
      // OPTIONAL: basic client-side filtering for price & rating if backend does not support it
      let items = res.data || [];

      // client-side price filter fallback (if backend ignores min/max)
      if (filters.priceMin !== "" || filters.priceMax !== "") {
        const min = Number(filters.priceMin) || 0;
        const max = filters.priceMax !== "" ? Number(filters.priceMax) : Number.POSITIVE_INFINITY;
        items = items.filter((p) => {
          const price = Number(p.price) || 0;
          return price >= min && price <= max;
        });
      }

      // client-side rating filter fallback (if products had rating field)
      if (filters.rating) {
        const r = Number(filters.rating);
        items = items.filter((p) => (p.rating ? Number(p.rating) >= r : true));
      }

      // client-side sort fallback
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

  // Add to Cart — navigates to cart after adding
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

  // Buy Now — navigate to payment
  const handleBuyNow = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to continue!");
      navigate("/login");
      return;
    }
    // for simplicity go to payment page (real flow should create order)
    navigate("/payment");
  };

  return (
    <div className="home-container">
      {/* Sidebar component (slide-in) */}
      <FilterSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onApply={(newFilters) => {
          // newFilters is object similar to filters
          setFilters((prev) => ({ ...prev, ...newFilters }));
          setSidebarOpen(false);
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
          <button
            className="filters-toggle-btn"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label="Toggle filters"
          >
            ☰ Filters
          </button>

          <div className="hero-text">
            <h1>Welcome to ShopSmart 🛍️</h1>
            <p>Discover our curated collection of the latest products.</p>
          </div>
        </div>

        {/* keep only category dropdown removed — filters live in sidebar */}
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
