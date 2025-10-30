import express from "express";
import Product from "../models/Product.js"; // ✅ correct path
const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add new product
router.post("/", async (req, res) => {
  const { name, description, price, image } = req.body;

  const product = new Product({ name, description, price, image });
  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
