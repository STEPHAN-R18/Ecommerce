// src/pages/OrderTracking.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { connectSocket, getSocket } from "../socket";
import "./OrderTracking.css";

export default function OrderTracking({ orderId }) {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    // 1️⃣ Connect to socket
    connectSocket();
    const socket = getSocket();

    // 2️⃣ Fetch order details
    async function fetchOrder() {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
        setOrder(data);
        setStatus(data.status || "Pending");
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    }

    if (orderId) fetchOrder();

    // 3️⃣ Join order room for live updates
    if (socket && orderId) {
      socket.emit("joinOrderRoom", { orderId });
      console.log("📦 Joined order room:", orderId);
    }

    const handleUpdate = ({ orderId: updatedId, status: newStatus }) => {
      if (updatedId === orderId) {
        console.log("🔔 Live status update:", newStatus);
        setStatus(newStatus);
      }
    };

    socket.on("orderStatusUpdated", handleUpdate);

    // 4️⃣ Cleanup on unmount
    return () => {
      if (socket) {
        socket.off("orderStatusUpdated", handleUpdate);
        socket.emit("leaveOrderRoom", { orderId });
        console.log("🚪 Left order room:", orderId);
      }
    };
  }, [orderId]);

  if (!order) return <div className="order-tracking">Loading order details...</div>;

  // ✅ Define progress steps
  const steps = ["Packed", "Shipped", "Out for Delivery", "Delivered"];
  const currentStep = steps.indexOf(status);

  return (
    <div className="order-tracking">
      <h2>Order Tracking 🚚</h2>

      <div className="order-info">
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Total:</strong> ₹{order.totalAmount}</p>
      </div>

      <div className="tracking-steps">
        {steps.map((step, idx) => (
          <div key={step} className={`step ${idx <= currentStep ? "active" : ""}`}>
            <div className="dot">{idx < currentStep ? "✓" : idx === currentStep ? "●" : ""}</div>
            <p>{step}</p>
          </div>
        ))}
      </div>

      <p className="status-text">
        Current Status: <strong>{status}</strong>
      </p>
    </div>
  );
}
