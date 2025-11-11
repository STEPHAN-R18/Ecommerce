import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { useFilters } from "../context/FilterContext";
import { useWishlist } from "../context/WishlistContext"; // ✅ new

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { openFilters } = useFilters();
  const { wishlist } = useWishlist(); // ✅ new

  // 🧠 Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setVisible(false); // Hide navbar on scroll down
      } else {
        setVisible(true); // Show navbar on scroll up
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 🧍‍♂️ User and cart setup
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

  // 🔍 Search query persistence
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    setSearch(query);
  }, [location.search]);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // 🔎 Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    if (query) navigate(`/?search=${encodeURIComponent(query)}`);
    else navigate("/");
  };

  return (
    <header className={`navbar-dark ${visible ? "show" : "hide"}`}>
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

              {/* Wishlist */}
              <Link to="/wishlist" className="navbar-wishlist">
                <div className="wishlist-icon-wrap">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/028/069/638/non_2x/positive-love-icon-free-vector.jpg"
                    alt="Wishlist"
                    className="wishlist-icon"
                  />
                  {wishlist.length > 0 && (
                    <span className="cart-badge">{wishlist.length}</span>
                  )}
                </div>
                <span className="wishlist-text">Wishlist</span>
              </Link>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>

        {/* 📱 Mobile Menu Icon */}
        <div
          className={`menu-icon ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
      )}
    </header>
  );
}
