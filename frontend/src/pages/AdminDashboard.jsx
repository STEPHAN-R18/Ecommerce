import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

const backendBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    let isMounted = true; // prevent setting state if unmounted

    // 1) fetch initial orders
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${backendBase}/api/admin/orders`);
        if (isMounted) setOrders(res.data);
      } catch (err) {
        console.error("Failed loading orders", err);
      }
    };
    fetchOrders();

    // 2) create socket only once
    if (!socketRef.current) {
      socketRef.current = io(backendBase);

      socketRef.current.on("connect", () => {
        console.log("Connected socket as admin", socketRef.current.id);
        socketRef.current.emit("joinAdminRoom");
      });

      socketRef.current.on("newOrder", (payload) => {
        console.log("New order received", payload);
        setOrders(prev => [payload, ...prev]);
      });

      socketRef.current.on("orderStatusUpdated", ({ orderId, status }) => {
        setOrders(prev =>
          prev.map(o => (o._id === orderId || o.orderId === orderId ? { ...o, status } : o))
        );
      });
    }

    return () => {
      isMounted = false;
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.patch(`${backendBase}/api/admin/orders/${orderId}/status`, {
        status: newStatus
      });
      setOrders(prev => prev.map(o => (o._id === orderId ? res.data : o)));
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard — Live Orders</h2>
      <p>Orders update in real-time. Connected via Socket.IO.</p>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Order ID</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id || o.orderId} style={{ borderTop: "1px solid #ddd" }}>
              <td>{o._id || o.orderId}</td>
              <td>
                {(o.items || []).map(it => (
                  <div key={it.productId || it.name}>
                    {it.name} x {it.qty}
                  </div>
                ))}
              </td>
              <td>{o.totalAmount}</td>
              <td>{o.status}</td>
              <td>{new Date(o.createdAt || o.created_at).toLocaleString()}</td>
              <td>
                <select
                  value={o.status}
                  onChange={e => updateStatus(o._id || o.orderId, e.target.value)}
                >
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
