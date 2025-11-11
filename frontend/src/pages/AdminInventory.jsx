import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminInventory.css";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  // Fetch products and users
  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:5000/api/admin/products");
    setProducts(data);
  };

  const fetchUsers = async () => {
    const { data } = await axios.get("http://localhost:5000/api/admin/users");
    setUsers(data);
  };

  // Add product
  const handleAddProduct = async () => {
    await axios.post("http://localhost:5000/api/admin/products", newProduct);
    alert("Product added!");
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image: "",
    });
    fetchProducts();
  };

  // Update product
  const handleUpdateStock = async (id, stock) => {
    await axios.put(`http://localhost:5000/api/admin/products/${id}`, { stock });
    fetchProducts();
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/products/${id}`);
    fetchProducts();
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="admin-page">
      <h1>🛠️ Admin Dashboard</h1>

      <section className="admin-section">
        <h2>➕ Add Product</h2>
        <div className="form-grid">
          {Object.keys(newProduct).map((key) => (
            <input
              key={key}
              placeholder={key}
              value={newProduct[key]}
              onChange={(e) =>
                setNewProduct({ ...newProduct, [key]: e.target.value })
              }
            />
          ))}
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
      </section>

      <section className="admin-section">
        <h2>📦 Manage Products</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>
                  <input
                    type="number"
                    value={p.stock || 0}
                    onChange={(e) => handleUpdateStock(p._id, e.target.value)}
                    style={{ width: "60px" }}
                  />
                </td>
                <td>{p.category}</td>
                <td>
                  <button onClick={() => handleDeleteProduct(p._id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="admin-section">
        <h2>👥 Manage Users</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <button onClick={() => handleDeleteUser(u._id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
