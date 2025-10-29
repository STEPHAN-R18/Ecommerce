import { useState, useEffect } from "react";
import { createProduct, updateProduct, getProductById } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/app.css";

export default function ProductForm() {
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const { data } = await getProductById(id);
    setForm(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateProduct(id, form);
      alert("Product updated successfully!");
    } else {
      await createProduct(form);
      alert("Product added successfully!");
    }
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2>{id ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <button type="submit">{id ? "Update" : "Create"}</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
