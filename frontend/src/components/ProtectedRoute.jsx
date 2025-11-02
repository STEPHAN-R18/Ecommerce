<<<<<<< HEAD
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user"); // ✅ Check if user is logged in
  return user ? children : <Navigate to="/login" replace />;
}
=======
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user"); // ✅ Check if user is logged in
  return user ? children : <Navigate to="/login" replace />;
}
>>>>>>> 72809590aa096b79a315a1fa15c7eceb21ddf3c4
