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
      name: "ShopSmart",
      description: "Order Payment",
      order_id: data.id,
      handler: function (response) {
        alert("Payment Successful: " + response.razorpay_payment_id);
      },
      theme: {
        color: "#4f46e5", // Indigo accent
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-sm sm:max-w-md text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Checkout 💳
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          Total Amount: <strong className="text-gray-900">₹{total}</strong>
        </p>
        <button
          onClick={handlePayment}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
