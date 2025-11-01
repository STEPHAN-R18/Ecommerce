import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ GET all products (with optional filters)
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ POST add new product
router.post("/", async (req, res) => {
  const { name, description, price, image, category } = req.body;

  const product = new Product({ name, description, price, image, category });
  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
