<<<<<<< HEAD
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    const { data } = await axios.post("http://localhost:5000/api/payment/create-order", { amount: total });

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: data.amount,
      currency: "INR",
      name: "My E-commerce App",
      description: "Order Payment",
      order_id: data.id,
      handler: function (response) {
        alert("Payment Successful: " + response.razorpay_payment_id);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h2>Checkout</h2>
      <h3>Total Amount: ₹{total}</h3>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}
=======
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    const { data } = await axios.post("http://localhost:5000/api/payment/create-order", { amount: total });

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: data.amount,
      currency: "INR",
      name: "My E-commerce App",
      description: "Order Payment",
      order_id: data.id,
      handler: function (response) {
        alert("Payment Successful: " + response.razorpay_payment_id);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h2>Checkout</h2>
      <h3>Total Amount: ₹{total}</h3>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}
>>>>>>> 72809590aa096b79a315a1fa15c7eceb21ddf3c4
