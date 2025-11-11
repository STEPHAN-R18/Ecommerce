import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <motion.div
        className="profile-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="profile-header">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=007bff&color=fff&size=120`}
            alt="Profile"
            className="profile-avatar"
          />
          <h2>{user.name}</h2>
          <p className="profile-email">{user.email}</p>
        </div>

        <div className="profile-stats">
          <div className="stat-box">
            <h4>Orders</h4>
            <p>12</p>
          </div>
          <div className="stat-box">
            <h4>Wishlist</h4>
            <p>5</p>
          </div>
          <div className="stat-box">
            <h4>Cart Items</h4>
            <p>3</p>
          </div>
        </div>

        <motion.button
          className="btn-logout"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
        >
          🚪 Logout
        </motion.button>
      </motion.div>
    </div>
  );
}
