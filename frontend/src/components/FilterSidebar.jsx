import { useState, useEffect } from "react";
import "./FilterSidebar.css";

export default function FilterSidebar({
  open,
  onClose,
  onApply,
  onClear,
  initialFilters,
}) {
  const [localFilters, setLocalFilters] = useState(initialFilters);

  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  const handleCategoryChange = (category) => {
    setLocalFilters((prev) => {
      const exists = prev.categories.includes(category);
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((c) => c !== category)
          : [...prev.categories, category],
      };
    });
  };

  const handleApply = () => onApply(localFilters);
  const handleClear = () => {
    setLocalFilters({
      categories: [],
      priceMin: "",
      priceMax: "",
      rating: "",
      sortBy: "",
      search: "",
    });
    onClear();
  };

  const categories = ["Electronics", "Fashion", "Home", "Sports", "Books"];

  return (
    <div className={`filter-sidebar ${open ? "open" : ""}`}>
      <div className="filter-header">
        <h2>Filters</h2>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="filter-body">
        {/* Category */}
        <div className="filter-section">
          <h4>Category</h4>
          <div className="filter-options">
            {categories.map((cat) => (
              <label key={cat} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={localFilters.categories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="filter-section">
          <h4>Price Range (₹)</h4>
          <div className="price-inputs">
            <input
              type="number"
              placeholder="Min"
              value={localFilters.priceMin}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  priceMin: e.target.value,
                }))
              }
            />
            <span className="dash">–</span>
            <input
              type="number"
              placeholder="Max"
              value={localFilters.priceMax}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  priceMax: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* Rating */}
        <div className="filter-section">
          <h4>Minimum Rating</h4>
          <select
            value={localFilters.rating}
            onChange={(e) =>
              setLocalFilters((prev) => ({ ...prev, rating: e.target.value }))
            }
          >
            <option value="">All Ratings</option>
            <option value="4">4 ★ & above</option>
            <option value="3">3 ★ & above</option>
            <option value="2">2 ★ & above</option>
            <option value="1">1 ★ & above</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="filter-section">
          <h4>Sort By</h4>
          <select
            value={localFilters.sortBy}
            onChange={(e) =>
              setLocalFilters((prev) => ({ ...prev, sortBy: e.target.value }))
            }
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      <div className="filter-footer">
        <button className="btn-clear" onClick={handleClear}>
          Clear
        </button>
        <button className="btn-apply" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
}
