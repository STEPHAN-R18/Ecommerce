import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

console.log("🔑 Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("🔑 Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET ? "Loaded" : "Missing");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency } = req.body;
    console.log("🪙 Creating order with amount:", amount, "currency:", currency);

    const options = {
      amount: Math.round(amount),
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("✅ Order created:", order);

    res.json(order);
  } catch (error) {
    console.error("❌ Razorpay order error:", error);
    res.status(500).json({ message: "Razorpay order creation failed", error: error.message });
  }
});

export default router;
