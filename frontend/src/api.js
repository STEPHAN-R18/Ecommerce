import axios from "axios";

// Use your Render backend link here 👇
const API = axios.create({
  baseURL: "https://ecommerce-backend-ir48.onrender.com/api",
});

// Products API
export const getProducts = (params) => API.get("/products", { params });
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export default API;
