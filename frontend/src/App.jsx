
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetail";
import ProductForm from "./pages/ProductForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/app.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile.jsx";
import PaymentPage from "./pages/PaymentPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import { FilterProvider } from "./context/FilterContext";
import "./pages/Responsive.css";

export default function App() {
  return (
    <Router>
      <FilterProvider>
      <Navbar />
      <Routes>
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <ProductForm />
            </ProtectedRoute>
          }
        />
        <Route path="/edit/:id" element={<ProductForm />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </FilterProvider>

      <Footer />
    </Router>
  );
}
