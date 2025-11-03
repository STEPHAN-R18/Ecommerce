import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css"; // ✅ Make sure this path is correct

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

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
  }, [id]);

  if (!product) {
    return (
      <div className="product-details-page">
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="product-card">
        {/* Left: Product Image */}
        <div className="product-image-section">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>

        {/* Right: Product Info */}
        <div className="product-info-section">
          <div>
            <h2 className="product-title">{product.name}</h2>
            <p className="product-category">{product.category}</p>
            <p className="product-description">{product.description}</p>
            <div className="product-price">₹{product.price}</div>
          </div>

          <div className="action-buttons">
            <button
              className="btn btn-cart"
              onClick={() => navigate("/cart")}
            >
              🛒 Add to Cart
            </button>
            <button
              className="btn btn-buy"
              onClick={() => navigate("/payment")}
            >
              💳 Buy Now
            </button>
          </div>
<div className="extra-details">
  <span>Free Delivery</span>
  <span>7 Days Return</span>
  <span>Cash on Delivery Available</span>
</div>
<div className="product-rating">
  <div className="stars">
    ★★★★☆
  </div>
  <p className="reviews">(124 ratings & 36 reviews)</p>
</div>

          <p
            className="back-link"
            onClick={() => navigate(-1)}
          >
            ← Back to Products
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
