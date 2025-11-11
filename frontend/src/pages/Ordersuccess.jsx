// src/pages/OrderSuccess.jsx
import React from "react";
import OrderTracking from "../components/OrderTracking";
import { useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams(); // dbOrderId from route /order-success/:id
  return (
    <div>
      <h2>Thank you — your payment is successful!</h2>
      <OrderTracking dbOrderId={id} />
    </div>
  );
}
