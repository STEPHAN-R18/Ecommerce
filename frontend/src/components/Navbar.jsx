import { Link } from "react-router-dom";
import "../styles/app.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>ShopEase</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/create">Add Product</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
