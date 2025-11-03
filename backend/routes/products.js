import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ Get all products (with category + search filter)
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category !== "") {
      filter.category = new RegExp(category, "i");
    }

    if (search && search.trim() !== "") {
      filter.name = new RegExp(search, "i");
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Get single product by ID (used in ProductDetails page)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
