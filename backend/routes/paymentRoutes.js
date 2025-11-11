// routes/payment.js
import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Order from "../models/Order.js"; // ✅ your Order schema
dotenv.config();

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log("✅ Razorpay initialized with key:", process.env.RAZORPAY_KEY_ID);

// --------------------
// 1️⃣ Create Razorpay Order
// --------------------
router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency, items, userId } = req.body;
    console.log("🪙 Creating order:", { amount, currency, userId });

    const options = {
      amount: Math.round(amount), // amount in paisa
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // auto capture payment
    };

    const order = await razorpay.orders.create(options);
    console.log("✅ Razorpay order created:", order.id);

    // Optional: Save order in DB
    const dbOrder = await Order.create({
      userId: userId || null,
      items: items || [],
      totalAmount: amount / 100,
      razorpayOrderId: order.id,
      status: "Pending", // can later change after verification
    });

    res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      dbOrderId: dbOrder._id.toString(),
    });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ message: "Razorpay order creation failed", error: error.message });
  }
});

// --------------------
// 2️⃣ Verify Payment Signature
// --------------------
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // ✅ Signature verified
      const order = await Order.findByIdAndUpdate(
        dbOrderId,
        {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: "Packed", // can later update via admin panel
        },
        { new: true }
      );

      // 🔔 Send real-time update to user (via Socket.IO)
      req.io?.to(dbOrderId.toString()).emit("orderStatusUpdated", {
        orderId: dbOrderId.toString(),
        status: order.status,
      });

      res.json({ success: true, order });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("❌ Verify error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
