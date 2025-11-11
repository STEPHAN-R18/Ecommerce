import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Order from "../models/Order.js";

dotenv.config(); // ✅ Load environment variables

const router = express.Router();

// 🟢 Check if keys exist before initializing Razorpay
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Missing Razorpay credentials in .env file");
  console.log("Expected keys:");
  console.log("RAZORPAY_KEY_ID =", process.env.RAZORPAY_KEY_ID);
  console.log("RAZORPAY_KEY_SECRET =", process.env.RAZORPAY_KEY_SECRET);
  throw new Error("Missing Razorpay credentials. Please check your .env file.");
}

// ✅ Initialize Razorpay instance
const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🟢 Create Razorpay Order
router.post("/create-order", async (req, res) => {
  try {
    const { amount, items, userId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // 1️⃣ Create order in Razorpay
    const options = {
      amount: amount * 100, // convert to paisa
      currency: "INR",
      receipt: "order_rcpt_" + Math.random().toString(36).substring(2, 8),
    };

    const order = await rzp.orders.create(options);

    // 2️⃣ Save the order in DB (optional but recommended)
    const dbOrder = await Order.create({
      userId,
      items,
      amount,
      paymentStatus: "pending",
      razorpayOrderId: order.id,
    });

    // 3️⃣ Send both Razorpay and DB order details to frontend
    res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      dbOrderId: dbOrder._id,
    });
  } catch (error) {
    console.error("❌ Razorpay create order error:", error);
    res.status(500).json({ message: "Razorpay create order failed" });
  }
});

// 🟢 Verify payment
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      dbOrderId,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // ✅ Update DB order status to "paid"
      await Order.findByIdAndUpdate(dbOrderId, {
        paymentStatus: "paid",
        razorpayPaymentId: razorpay_payment_id,
      });

      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("❌ Payment verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
