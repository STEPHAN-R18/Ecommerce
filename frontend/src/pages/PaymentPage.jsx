import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";
import { connectSocket } from "../socket";

export default function PaymentPage() {
  const navigate = useNavigate();

  // ✅ Get product/cart data safely from localStorage
  const savedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const userId = localStorage.getItem("userId") || null;
  const cartItems = savedCartItems;

  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online"); // "online" or "cod"

  useEffect(() => {
    connectSocket();

    if (cartItems && cartItems.length > 0) {
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
      const delivery = 40;
      setTotalAmount(subtotal + delivery);
    } else {
      alert("No items added in the cart!");
      navigate("/", { replace: true });
    }
  }, [cartItems, navigate]);

  // Razorpay payment
  const handleOnlinePayment = async () => {
    try {
      setLoading(true);

      const items = cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty,
      }));

      const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: totalAmount,
        currency: "INR",
        items,
        userId,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "ShopSmart Checkout",
        description: "Ecommerce Payment",
        order_id: data.id,
        handler: async function (response) {
          try {
            const verifyResp = await axios.post("http://localhost:5000/api/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              dbOrderId: data.dbOrderId,
            });

            if (verifyResp.data.success) {
              alert("✅ Payment verified & order created!");
              localStorage.removeItem("cart");
              navigate("/payment-success");
            } else {
              alert("❌ Payment verification failed!");
            }
          } catch (err) {
            console.error("verify error", err);
            alert("❌ Verification failed. Check console.");
          }
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert("❌ Payment failed. Please try again!");
        console.error("payment.failed", response.error);
      });
      rzp.open();
    } catch (err) {
      console.error("create order error", err);
      alert("Failed to start payment. Check server logs.");
    } finally {
      setLoading(false);
    }
  };

  // Cash on Delivery
  const handleCOD = async () => {
    try {
      setLoading(true);

      const orderData = {
        productId: cartItems[0]._id,
        paymentMethod: "COD",
      };

      const { data } = await axios.post("http://localhost:5000/api/orders", orderData);

      alert("✅ Order placed successfully with Cash on Delivery!");
      localStorage.removeItem("cart");
      navigate("/payment-success");
    } catch (err) {
      console.error("COD order error", err);
      alert("❌ Failed to place COD order.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (paymentMethod === "cod") {
      handleCOD();
    } else {
      handleOnlinePayment();
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">💳 Secure Payment</h2>
        <p className="payment-subtitle">
          Complete your order safely using Razorpay or choose Cash on Delivery
        </p>

        {/* Order Summary */}
        <div className="payment-summary">
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </li>
            ))}
            <li>
              <span>Delivery</span>
              <span>₹40</span>
            </li>
            <li className="total-line">
              <strong>Total</strong>
              <strong>₹{totalAmount}</strong>
            </li>
          </ul>
        </div>

        {/* Payment Method */}
        <div className="payment-method">
          <h3>Select Payment Option</h3>
          <label>
            <input
              type="radio"
              value="online"
              checked={paymentMethod === "online"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            💳 Online Payment (Razorpay)
          </label>
          <label>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            🪙 Cash on Delivery
          </label>
        </div>

        <button
          className="btn-pay"
          onClick={handlePayment}
          disabled={loading || totalAmount <= 0}
        >
          {loading
            ? "Processing..."
            : paymentMethod === "cod"
            ? "Place COD Order"
            : `Pay ₹${totalAmount}`}
        </button>
      </div>
    </div>
  );
}
