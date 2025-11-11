import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getSocket } from "../socket";
import ProductReviews from "../components/ProductReviews";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || null;

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();

    const socket = getSocket();
    if (socket) {
      socket.on("stockUpdate", ({ productId, stock }) => {
        if (productId === id) {
          setProduct((prev) => ({ ...prev, stock }));
        }
      });
    }

    return () => {
      if (socket) socket.off("stockUpdate");
    };
  }, [id]);

  // Buy Now → open payment options
  const handleBuyNow = () => {
    if (!product || product.stock <= 0) {
      alert("Product is out of stock!");
      return;
    }
    setShowPaymentOptions(true);
  };

  // Handle Payment selection
  const handlePaymentSelection = (method) => {
    if (!product) return;

    if (method === "COD") {
      axios
        .post("http://localhost:5000/api/orders", {
          productId: product._id,
          paymentMethod: "COD",
        })
        .then((res) => {
          alert("Order placed successfully with Cash on Delivery!");
          navigate(`/track/${res.data._id}`);
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to place COD order!");
        });
    } else if (method === "Online") {
      // Save cartItems & userId in localStorage
      localStorage.setItem("cartItems", JSON.stringify([{ ...product, qty: 1 }]));
      localStorage.setItem("userId", user?._id || "");
      navigate("/payment");
    }
  };

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="product-card-pro">
        {/* Left Section */}
        <div className="product-image-section">
          <div className="image-wrapper">
            <img src={product.image} alt={product.name} className="product-image-pro" />
          </div>
        </div>

        {/* Right Section */}
        <div className="product-info-section">
          <div className="info-header">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-category">{product.category}</p>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="price-stock">
            <h3 className="product-price">₹{product.price}</h3>
            <p className={product.stock > 0 ? "in-stock" : "out-stock"}>
              {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
            </p>
          </div>

          <div className="action-buttons">
            <button className="btn btn-cart" onClick={() => navigate("/cart")}>
              🛒 Add to Cart
            </button>
            <button className="btn btn-buy" onClick={handleBuyNow}>
              💳 Buy Now
            </button>
          </div>

          <div className="extra-details">
            <span>🚚 Free Delivery</span>
            <span>↩️ 7 Days Return</span>
            <span>💵 Cash on Delivery</span>
          </div>

          <p className="back-link" onClick={() => navigate(-1)}>
            ← Back to Products
          </p>
        </div>
      </div>

      {/* Payment Option Popup */}
      {showPaymentOptions && (
        <div className="payment-option-popup">
          <div className="popup-content">
            <h3>Select Payment Option</h3>
            <button className="btn btn-payment" onClick={() => handlePaymentSelection("COD")}>
              💵 Cash on Delivery
            </button>
            <button className="btn btn-payment" onClick={() => handlePaymentSelection("Online")}>
              💳 Pay Online
            </button>
            <button className="btn btn-cancel" onClick={() => setShowPaymentOptions(false)}>
              ❌ Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <ProductReviews productId={id} token={token} user={user} />
    </div>
  );
};

export default ProductDetails;
