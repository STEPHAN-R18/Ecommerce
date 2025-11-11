import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import OrderTracking from "./pages/OrderTracking";
import { useParams } from "react-router-dom";
import AdminInventory from "./pages/AdminInventory";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetail";
import ProductForm from "./pages/ProductForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/app.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import PaymentPage from "./pages/PaymentPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import { FilterProvider } from "./context/FilterContext";
import "./pages/Responsive.css";
import { connectSocket, disconnectSocket } from "./socket";
import Wishlist from "./pages/Wishlist";
import { WishlistProvider } from "./context/WishlistContext"; 
import AdminDashboard from "./pages/AdminDashboard";
// 🆕 Added for Live Chat Feature
import { ChatProvider } from "./context/ChatContext.jsx";
import ChatWidget from "./components/ChatWidget";

// ✅ Added ReviewProvider
import { ReviewProvider } from "./context/ReviewContext";


// 🆕 Wrapper component to extract orderId from URL params
function OrderTrackingWrapper() {
  const { orderId } = useParams();
  return <OrderTracking orderId={orderId} />;
}


// Animated routes wrapper
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
         <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route path="/edit/:id" element={<ProductForm />} />
          <Route path="/login" element={<Login />} />
                  <Route path="/track/:orderId" element={<OrderTrackingWrapper />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = connectSocket({
      token,
      onConnect: (s) => console.log("🟢 Socket connected:", s.id),
    });

    socket.on("notification", (msg) => {
      console.log("🔔 Notification received:", msg);
    });

    return () => {
      disconnectSocket();
      console.log("🔴 Socket disconnected");
    };
  }, []);

  return (
    <Router>
      <FilterProvider>
        <WishlistProvider>
          <ChatProvider>
            <ReviewProvider> {/* ✅ Wrap app with ReviewProvider */}
              <Navbar />

              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: "#333",
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                  },
                }}
              />

              <AnimatedRoutes />

              <ChatWidget />
              <Footer />
            </ReviewProvider>
          </ChatProvider>
        </WishlistProvider>
      </FilterProvider>
    </Router>
  );
}
