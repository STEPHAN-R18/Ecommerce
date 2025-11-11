import React, { useState } from "react";
import axios from "axios";

export default function Checkout({ product }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (paymentMethod === "cod") {
      // 🟢 Directly create order in DB with 'Pending' status
      try {
        setLoading(true);
        const { data } = await axios.post("/api/orders", {
          productId: product._id,
          paymentMethod: "COD",
        });
        alert("Order placed successfully with Cash on Delivery!");
      } catch (err) {
        alert("Error placing order");
      } finally {
        setLoading(false);
      }
    } else if (paymentMethod === "online") {
      // 💳 Proceed with Razorpay payment
      try {
        setLoading(true);
        const { data } = await axios.post("/api/payment/create-order", {
          amount: product.price,
        });

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          order_id: data.id,
          name: "MyShop",
          description: "Test Payment",
          handler: async function (response) {
            await axios.post("/api/payment/verify", response);
            alert("Payment successful!");
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      } catch (err) {
        console.error(err);
        alert("Payment failed");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="checkout-container">
      <h3>Select Payment Method</h3>
      <label>
        <input
          type="radio"
          name="payment"
          value="cod"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Cash on Delivery
      </label>
      <label>
        <input
          type="radio"
          name="payment"
          value="online"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Online Payment
      </label>

      <button disabled={loading} onClick={handlePlaceOrder}>
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}
