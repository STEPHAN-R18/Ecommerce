import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  totalAmount: Number,
  razorpayOrderId: String,   // from Razorpay
  razorpayPaymentId: String, // after success
  razorpaySignature: String, // after success
  status: {
    type: String,
    enum: ["Packed", "Shipped", "Out for Delivery", "Delivered"],
    default: "Packed",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
