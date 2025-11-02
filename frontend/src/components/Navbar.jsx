import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // 🟢 Load user & listen for cart updates
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) setUser(JSON.parse(userData));

    // Load initial cart
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);

    // 👂 Listen for custom "cartUpdated" event
    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(updatedCart.length);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/?search=${encodeURIComponent(search.trim())}`);
    else navigate("/");
  };

  return (
    <header className="navbar-dark">
      <div className="navbar-inner">
        {/* LEFT */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <span>ShopSmart</span>
          </Link>
        </div>

        {/* CENTER - SEARCH */}
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

        {/* RIGHT */}
        <div className="navbar-right">
          {!user ? (
            <nav className="navbar-auth">
              <Link to="/register" className="auth-link">Register</Link>
              <Link to="/login" className="auth-link">Login</Link>
            </nav>
          ) : (
            <div
              className="navbar-user"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/030/386/868/small/profiling-icon-vector.jpg"
                alt="User"
                className="user-avatar"
              />
              <span className="user-name">Hi, {user.name || "User"}</span>

              {showDropdown && (
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item">👤 Profile</Link>
                  <button onClick={handleLogout} className="dropdown-item logout">🚪 Logout</button>
                </div>
              )}
            </div>
          )}

          {/* 🛒 Cart */}
          <Link to="/cart" className="navbar-cart">
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
        </div>
      </div>
    </header>
  );
}
