// src/components/BuyNow.jsx
import React from "react";
import axios from "axios";

const BuyNow = ({ amount, items, userId }) => {
  const handleBuyNow = async () => {
    try {
      // 1️⃣ Create order on backend
      const { data } = await axios.post("/api/payment/create-order", {
        amount,
        items,
        userId,
      });

      // 2️⃣ Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // frontend key
        amount: data.amount, // in paisa
        currency: data.currency,
        order_id: data.id,
        handler: async function (response) {
          // 3️⃣ Verify payment on backend
          await axios.post("/api/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            dbOrderId: data.dbOrderId,
          });
          alert("Payment successful!");
        },
        theme: { color: "#3399cc" },
      };

      // 4️⃣ Open Razorpay popup
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Check console for details.");
    }
  };

  return (
    <button onClick={handleBuyNow} className="buy-now-btn">
      Buy Now
    </button>
  );
};

export default BuyNow;
