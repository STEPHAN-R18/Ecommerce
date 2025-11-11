// utils/autoProgressDemo.js
import Order from "../models/Order.js";

export async function autoProgress(orderId, io) {
  const steps = ["Packed", "Shipped", "Out for Delivery", "Delivered"];

  for (let i = 1; i < steps.length; i++) {
    // Wait 10 seconds before each status update
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // Update order status in DB
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: steps[i] },
      { new: true }
    );

    // Emit update to the specific client (via Socket.IO)
    io.to(orderId.toString()).emit("orderStatusUpdated", {
      orderId: orderId.toString(),
      status: order.status,
    });
  }
}
