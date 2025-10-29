import { Link } from "react-router-dom";
import "../styles/app.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image || "https://via.placeholder.com/250"} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/product/${product._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}
