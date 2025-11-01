import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/app.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await getProductById(id);
      setProduct(data);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      alert("Product deleted successfully");
      window.location.href = "/";
    }
  };

  if (!product) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="form-container">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          style={{ width: "100%", borderRadius: "10px", marginBottom: "1rem" }}
        />
        <h2>{product.name}</h2>
        <p style={{ color: "#666", margin: "1rem 0" }}>{product.description}</p>
        <h3 style={{ color: "#007bff" }}>${product.price}</h3>

        <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
          <Link to={`/edit/${product._id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete} style={{ backgroundColor: "#dc3545" }}>
            Delete
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
