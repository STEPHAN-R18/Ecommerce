import { useState } from "react";
import axios from "axios";
import "./PaymentPage.css";

export default function PaymentPage() {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: amount * 100, // convert to paisa
        currency: "INR",
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "ShopSmart Checkout",
        description: "Ecommerce Payment",
        order_id: data.id,
        handler: function (response) {
          alert("✅ Payment Successful!");
          console.log("Payment success:", response);
        },
        theme: {
          color: "#0d6efd",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("❌ Payment failed. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">💳 Secure Payment</h2>
        <p className="payment-subtitle">
          Complete your order safely using Razorpay
        </p>

        <div className="payment-form">
          <label>Enter Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="payment-input"
          />
          <button
            className="btn-pay"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Pay"}
          </button>
        </div>

        <div className="payment-summary">
          <h3>Order Summary</h3>
          <ul>
            <li>
              <span>Subtotal</span>
              <span>₹{amount || 0}</span>
            </li>
            <li>
              <span>Delivery</span>
              <span>₹40</span>
            </li>
            <li>
              <strong>Total</strong>
              <strong>₹{amount ? Number(amount) + 40 : 40}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
