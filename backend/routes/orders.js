import express from "express";
import Order from "../models/Order.js";
import { autoProgress } from "../utils/autoProgressDemo.js";

const router = express.Router();

// 🟢 Create order (COD or Online Payment)
router.post("/", async (req, res) => {
  try {
    const { productId, paymentMethod } = req.body;

    if (!productId || !paymentMethod) {
      return res.status(400).json({ message: "Product ID and payment method are required" });
    }

    // Create new order
    const order = new Order({
      productId,
      paymentMethod,
      status: paymentMethod === "COD" ? "Pending" : "Initiated",
    });

    await order.save();

    // 🧩 Optional: auto-progress demo for testing real-time updates
    if (process.env.NODE_ENV === "development" && paymentMethod === "Online") {
      autoProgress(order._id, req.io);
    }

    // ✅ Emit to admin room (so admin panel sees new orders immediately)
    if (req.io) {
      req.io.to("adminRoom").emit("newOrder", {
        orderId: order._id,
        productId: order.productId,
        paymentMethod: order.paymentMethod,
        status: order.status,
        createdAt: order.createdAt,
      });
    }

    // ✅ Optionally emit to order-specific room (for user tracking)
    if (req.io) {
      req.io.to(order._id.toString()).emit("orderCreated", {
        orderId: order._id,
        status: order.status,
      });
    }

    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟡 Get order by DB id
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔵 Update status (admin). Emits to the order room.
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["Packed", "Shipped", "Out for Delivery", "Delivered"];
    if (!allowed.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    // ✅ Emit status update to user order room
    req.io.to(req.params.id.toString()).emit("orderStatusUpdated", {
      orderId: req.params.id.toString(),
      status,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
