import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>✅ Payment Completed!</h1>
      <p>Thank you for your order. Your payment has been successfully processed.</p>
      <button
        style={{
          padding: "10px 20px",
          fontSize: 16,
          marginTop: 20,
          cursor: "pointer",
        }}
        onClick={() => navigate("/orders")}
      >
        Go to My Orders
      </button>
    </div>
  );
}
