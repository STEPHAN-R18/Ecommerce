import React, { useEffect, useState } from "react";
import "./FilterSidebar.css";

const ALL_CATEGORIES = [
  { id: "electronics", label: "Electronics" },
  { id: "fashion", label: "Fashion" },
  { id: "books", label: "Books" },
  { id: "home", label: "Home & Kitchen" },
];

export default function FilterSidebar({ open = false, onClose, onApply, onClear, initialFilters }) {
  const [local, setLocal] = useState({
    categories: [],
    priceMin: "",
    priceMax: "",
    rating: "",
    sortBy: "",
    search: "",
  });

  useEffect(() => {
    if (initialFilters) setLocal(initialFilters);
  }, [initialFilters]);

  const toggleCategory = (catId) => {
    setLocal((prev) => {
      const exists = prev.categories.includes(catId);
      const categories = exists ? prev.categories.filter((c) => c !== catId) : [...prev.categories, catId];
      return { ...prev, categories };
    });
  };

  const handleApply = () => {
    // Make sure numeric fields are trimmed
    const payload = {
      categories: local.categories,
      priceMin: local.priceMin,
      priceMax: local.priceMax,
      rating: local.rating,
      sortBy: local.sortBy,
      search: local.search,
    };
    onApply && onApply(payload);
  };

  const handleClear = () => {
    const cleared = {
      categories: [],
      priceMin: "",
      priceMax: "",
      rating: "",
      sortBy: "",
      search: "",
    };
    setLocal(cleared);
    onClear && onClear();
  };

  return (
    <>
      <div className={`filter-backdrop ${open ? "visible" : ""}`} onClick={onClose} />
      <aside className={`filter-sidebar ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="filter-header">
          <h3>Filters</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close filters">
            ✕
          </button>
        </div>

        <div className="filter-section">
          <label className="filter-label">Search</label>
          <input
            type="text"
            placeholder="Search products..."
            value={local.search}
            onChange={(e) => setLocal((p) => ({ ...p, search: e.target.value }))}
            className="filter-input"
          />
        </div>

        <div className="filter-section">
          <label className="filter-label">Categories</label>
          <div className="categories-list">
            {ALL_CATEGORIES.map((c) => (
              <label key={c.id} className="category-item">
                <input
                  type="checkbox"
                  checked={local.categories.includes(c.id)}
                  onChange={() => toggleCategory(c.id)}
                />
                <span>{c.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-label">Price Range (₹)</label>
          <div className="price-row">
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={local.priceMin}
              onChange={(e) => setLocal((p) => ({ ...p, priceMin: e.target.value }))}
              className="price-input"
            />
            <span className="price-sep">—</span>
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={local.priceMax}
              onChange={(e) => setLocal((p) => ({ ...p, priceMax: e.target.value }))}
              className="price-input"
            />
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-label">Rating</label>
          <select
            value={local.rating}
            onChange={(e) => setLocal((p) => ({ ...p, rating: e.target.value }))}
            className="filter-select"
          >
            <option value="">Any</option>
            <option value="4">4 ★ & up</option>
            <option value="3">3 ★ & up</option>
            <option value="2">2 ★ & up</option>
            <option value="1">1 ★ & up</option>
          </select>
        </div>

        <div className="filter-section">
          <label className="filter-label">Sort by</label>
          <select
            value={local.sortBy}
            onChange={(e) => setLocal((p) => ({ ...p, sortBy: e.target.value }))}
            className="filter-select"
          >
            <option value="">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="filter-actions">
          <button className="btn-apply" onClick={handleApply}>
            Apply
          </button>
          <button className="btn-clear" onClick={handleClear}>
            Clear
          </button>
        </div>
      </aside>
    </>
  );
}
