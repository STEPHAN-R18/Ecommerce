import React, { useEffect } from "react";
import io from "socket.io-client";

const backendBase = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export default function OrderStatus({ orderId }) {
  useEffect(() => {
    const socket = io(backendBase);

    socket.on("connect", () => {
      socket.emit("joinOrderRoom", orderId);
      console.log("✅ Joined room:", orderId);
    });

    socket.on("orderStatusUpdated", ({ orderId: id, status }) => {
      if (id === orderId) {
        // You can use a state variable instead of console.log for UI updates
        console.log("📦 Order updated:", status);
      }
    });

    return () => {
      socket.emit("leaveOrderRoom", orderId);
      socket.disconnect();
    };
  }, [orderId]);

  return <div>Order: {orderId} — status will update in real-time</div>;
}
