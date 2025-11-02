<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/cart");
  };

  if (loading) return <p className="text-center mt-10">Loading product details...</p>;
  if (!product) return <p className="text-center mt-10 text-red-500">Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-md">
      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="flex justify-center items-center">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="w-96 h-96 object-contain rounded-lg border"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-gray-500 mt-1">{product.category || "Smartwatch"}</p>

          {/* Ratings */}
          <div className="flex items-center mt-2 space-x-2">
            <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
              4.1 ★
            </span>
            <span className="text-gray-500 text-sm">(14,021 Ratings & 22,421 Reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-4">
            <span className="text-3xl font-bold text-green-700">₹{product.price}</span>
            <span className="text-gray-500 line-through ml-2">₹7,999</span>
            <span className="text-green-600 font-semibold ml-2">87% off</span>
          </div>

          {/* Offers */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Available offers</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>💳 10% instant discount on SBI Credit Card EMI Transactions</li>
              <li>🏦 Flat ₹50 off on Flipkart Bajaj Finserv Insta EMI Card</li>
              <li>💰 10% off up to ₹1,500 on BOBCARD EMI Transactions</li>
              <li>🔥 Special Price Get extra 66% off</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={addToCart}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={() => navigate("/payment")}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              💳 Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-10" />

      {/* Highlights & Specs */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-semibold text-xl mb-3">Highlights</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Bluetooth Calling with Dedicated Speaker and Mic</li>
            <li>1.69” HD Screen, 475 Nits Brightness</li>
            <li>140+ Watch Faces | 60 Sports Modes</li>
            <li>SpO2, Heart Rate, Sleep & Step Tracking</li>
            <li>IP68 Water Resistant | 7 Days Battery Life</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-xl mb-3">Warranty</h2>
          <p className="text-gray-700">1 Year warranty from the date of purchase</p>
          <p className="text-gray-500 text-sm mt-1">
            For warranty claims, contact: 9667879464 (IVR Support)
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10">
        <h2 className="font-semibold text-xl mb-3">Description</h2>
        <p className="text-gray-700 leading-relaxed">
          The GOBOULT Drift smartwatch features a high brightness HD display, 140+ customizable
          watch faces, and 60 sports modes to help you track every goal. Its dedicated mic and
          speaker let you make calls directly from your wrist, while built-in sensors monitor
          heart rate, SpO2, and sleep patterns. IP68 water resistance ensures durability for daily
          use, with a battery lasting up to 7 days.
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
=======
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
>>>>>>> 72809590aa096b79a315a1fa15c7eceb21ddf3c4
