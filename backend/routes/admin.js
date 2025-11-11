// backend/routes/admin.js
import express from "express";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import { authenticate, isAdmin } from "../middleware/auth.js";

const router = express.Router();

/* ---------------------------------------------------------
   🔐 Apply Admin Authentication Middleware
--------------------------------------------------------- */
router.use(authenticate);
router.use(isAdmin);

/* ---------------------------------------------------------
   🛍️ PRODUCT MANAGEMENT
--------------------------------------------------------- */

// 🧮 Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// ➕ Add a new product
router.post("/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
});

// ✏️ Update a product
router.put("/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Product updated successfully", product: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});

// ❌ Delete a product
router.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

/* ---------------------------------------------------------
   👥 USER MANAGEMENT
--------------------------------------------------------- */

// 👥 Get all users (hide passwords)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// ❌ Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

/* ---------------------------------------------------------
   📦 ORDER MANAGEMENT
--------------------------------------------------------- */

// 🟢 Get all orders (latest first)
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// 🟡 Update order status + emit real-time update
router.patch("/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    // ✅ Real-time updates via Socket.IO
    if (req.io) {
      // Notify admin dashboard
      req.io.to("adminRoom").emit("orderStatusUpdated", {
        orderId: order._id.toString(),
        status: order.status,
      });

      // Notify user who placed the order
      req.io.to(order._id.toString()).emit("orderStatusUpdated", {
        orderId: order._id.toString(),
        status: order.status,
      });
    }

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status" });
  }
});

export default router;
