import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // ✅ Load cart initially
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // ✅ Remove item from cart + trigger update
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // 🔔 Instantly refresh navbar cart count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ✅ Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // ✅ Proceed to checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/payment", { state: { cart, total } });
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
          />
          <h2>Your cart is empty!</h2>
          <p>Looks like you haven’t added anything yet.</p>
          <button className="btn-continue" onClick={() => navigate("/")}>
            🛍️ Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <button
                    className="btn-remove"
                    onClick={() => removeFromCart(item._id)}
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>
              Total Items: <strong>{cart.length}</strong>
            </p>
            <p>
              Total Amount: <strong>₹{total}</strong>
            </p>
            <button className="btn-checkout" onClick={handleCheckout}>
              💳 Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
