
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user"); // ✅ Check if user is logged in
  return user ? children : <Navigate to="/login" replace />;
}
