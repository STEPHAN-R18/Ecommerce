import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ Fetch products (with category & search filter)
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category !== "") {
      // use lowercase match for safety
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

export default router;
