import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { useFilters } from "../context/FilterContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openFilters } = useFilters();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) setUser(JSON.parse(userData));

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);

    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(updatedCart.length);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    setSearch(query);
  }, [location.search]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    if (query) navigate(`/?search=${encodeURIComponent(query)}`);
    else navigate("/");
  };

  return (
    <header className="navbar-dark">
      <div className="navbar-inner">
        {/* LEFT SIDE */}
        <div className="navbar-left">
          <button
            className="filters-toggle-btn"
            onClick={openFilters}
            aria-label="Toggle filters"
          >
            ☰ Filters
          </button>

          <Link to="/" className="navbar-logo">
            <span>ShopSmart</span>
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center">
          <form className="nav-search" onSubmit={handleSearch}>
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search for products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                alt="search"
                className="search-icon"
                onClick={handleSearch}
              />
            </div>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
          {!user ? (
            <nav className="navbar-auth">
              <Link
                to="/register"
                className="auth-link"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                to="/login"
                className="auth-link"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </nav>
          ) : (
            <>
              <div
                className="navbar-user"
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
              >
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/030/386/868/small/profiling-icon-vector.jpg"
                  alt="User"
                  className="user-avatar"
                />
                <span className="user-name">Hi, {user.name || "User"}</span>
              </div>

              <Link
                to="/cart"
                className="navbar-cart"
                onClick={() => setMenuOpen(false)}
              >
                <div className="cart-icon-wrap">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQyr6OxhyD7jjWxj0Qi3hd8dwFW1w5nxrCS7R2i1Ay47zVTIIUE7qQoRyg8NpRgcRVV38&usqp=CAU"
                    alt="Cart"
                    className="cart-icon"
                  />
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </div>
                <span className="cart-text">Cart</span>
              </Link>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>

        {/* 📱 Mobile menu icon */}
        <div
          className={`menu-icon ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>

      {/* Background overlay when menu open */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
      )}
    </header>
  );
}
