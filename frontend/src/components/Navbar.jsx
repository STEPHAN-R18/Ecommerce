import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) setUser(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="navbar-dark">
      <div className="navbar-inner">
        {/* LEFT */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">🛍️ <span>ShopSmart</span></Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center">
          <div className="search-wrap">
            <input className="search-input" placeholder="Search for Products, Brands and More" />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="navbar-right">
          {!user ? (
            <nav className="navbar-auth">
              <Link to="/register" className="auth-link">Register</Link>
              <Link to="/login" className="auth-link">Login</Link>
            </nav>
          ) : (
            <div className="navbar-user">
              <Link to="/profile" className="auth-link">👤 {user.name}</Link>
            </div>
          )}

          <Link to="/cart" className="navbar-cart">🛒 Cart</Link>
        </div>
      </div>
    </header>
  );
}
