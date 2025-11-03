
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected for Seeding"))
  .catch((err) => console.log(err));

const products = [
  // 📚 BOOKS (5)
  {
    name: "The Alchemist",
    description: "A philosophical novel by Paulo Coelho about destiny and dreams.",
    price: 299,
    image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
    category: "Books",
  },
  {
    name: "Atomic Habits",
    description: "James Clear's guide to building good habits and breaking bad ones.",
    price: 399,
    image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
    category: "Books",
  },
  {
    name: "Rich Dad Poor Dad",
    description: "Robert Kiyosaki explains the mindset difference between rich and poor.",
    price: 349,
    image: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg",
    category: "Books",
  },
  {
    name: "Think Like a Monk",
    description: "Jay Shetty’s guide to inner peace and purpose.",
    price: 329,
    image: "https://m.media-amazon.com/images/I/81s6DUyQCZL.jpg",
    category: "Books",
  },
  {
    name: "Do Epic Shit",
    description: "Ankur Warikoo shares powerful life lessons and personal growth insights.",
    price: 275,
    image: "https://m.media-amazon.com/images/I/61NaTslN3tL.jpg",
    category: "Books",
  },

  // 👕 MEN'S FASHION (8)
  {
    name: "Men's Classic Fit Cotton Shirt",
    description: "Soft cotton shirt perfect for office and casual wear.",
    price: 899,
    image: "https://m.media-amazon.com/images/I/71BT3g0L2ZL._UY879_.jpg",
    category: "Fashion",
  },
  {
    name: "Men's Slim Fit Jeans",
    description: "Comfortable stretch denim for everyday style.",
    price: 1299,
    image: "https://m.media-amazon.com/images/I/61YzHqE5IPL._UX679_.jpg",
    category: "Fashion",
  },
  {
    name: "Men's Black Hoodie",
    description: "Cozy fleece hoodie with front pockets.",
    price: 1499,
    image: "https://m.media-amazon.com/images/I/61NISj7DcML._UX679_.jpg",
    category: "Fashion",
  },
  {
    name: "Men's Sports T-Shirt",
    description: "Breathable polyester fabric ideal for workouts.",
    price: 799,
    image: "https://m.media-amazon.com/images/I/71AjW4VQGCL._UY879_.jpg",
    category: "Fashion",
  },
  {
    name: "Men's Formal Trousers",
    description: "Slim-fit formal pants perfect for office or events.",
    price: 1199,
    image: "https://m.media-amazon.com/images/I/71iF8D0aMtL._UX679_.jpg",
    category: "Fashion",
  },
  {
    name: "Men's Running Shoes",
    description: "Lightweight running shoes with breathable mesh upper.",
    price: 1799,
    image: "https://m.media-amazon.com/images/I/71MZ0ZJ5PPL._UY879_.jpg",
    category: "Fashion",
  },
  {
    name: "Men's Leather Belt",
    description: "Durable leather belt with classic buckle.",
    price: 699,
    image: "https://m.media-amazon.com/images/I/71FQt0sFv5L._UY879_.jpg",
    category: "Fashion",
  },
  {
    name: "Men's Analog Wrist Watch",
    description: "Stylish analog watch with leather strap.",
    price: 2499,
    image: "https://m.media-amazon.com/images/I/71Xq5IBTq2L._UX679_.jpg",
    category: "Fashion",
  },

  // 👗 WOMEN'S FASHION (8)
  {
    name: "Women's Floral Maxi Dress",
    description: "Beautiful floral printed dress for casual outings.",
    price: 1499,
    image: "https://m.media-amazon.com/images/I/81O1oy0Hq3L._UY879_.jpg",
    category: "Fashion",
  },
  {
    name: "Women's Cotton Kurti",
    description: "Elegant and comfortable cotton kurti for daily wear.",
    price: 999,
    image: "https://m.media-amazon.com/images/I/71kwjMXRZbL._UY879_.jpg",
    category: "Fashion",
  },
  {
    name: "Women's Denim Jacket",
    description: "Trendy blue denim jacket with full sleeves.",
    price: 1899,
    image: "https://m.media-amazon.com/images/I/71doyd8nWDL._UY879_.jpg",
    category: "Fashion",
  },
  {
    name: "Women's Party Gown",
    description: "Long satin gown for evening parties.",
    price: 2999,
    image: "https://m.media-amazon.com/images/I/61pxPjoYcRL._UY879_.jpg",
    category: "Fashion",
  },
  {
    name: "Women's Casual Sneakers",
    description: "White sneakers with cushioned sole.",
    price: 1699,
    image: "https://m.media-amazon.com/images/I/61ws8b8TBuL._UY879_.jpg",
    category: "Fashion",
  },
  {
    name: "Women's Leather Handbag",
    description: "Premium PU leather handbag with zip closure.",
    price: 1899,
    image: "https://m.media-amazon.com/images/I/71lKPL9ZKpL._UY879_.jpg",
    category: "Fashion",
  },
  {
    name: "Women's Silver Earrings",
    description: "Elegant silver-plated earrings for formal events.",
    price: 499,
    image: "https://m.media-amazon.com/images/I/71PkVD6fvwL._UY879_.jpg",
    category: "Fashion",
  },
  {
    name: "Women's Cotton Scarf",
    description: "Soft cotton scarf for all seasons.",
    price: 299,
    image: "https://m.media-amazon.com/images/I/61gL7QRG8bL._UY879_.jpg",
    category: "Fashion",
  },

  // 🏠 HOME & KITCHEN (10)
  {
    name: "Non-stick Frying Pan",
    description: "Durable non-stick pan with heat-resistant handle.",
    price: 899,
    image: "https://m.media-amazon.com/images/I/81AG7pKz8-L._SX679_.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Leak-proof insulated bottle keeps water cool for 12 hours.",
    price: 749,
    image: "https://m.media-amazon.com/images/I/51jqJwDkAHL._SX679_.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Ceramic Dinner Set (18 pcs)",
    description: "Elegant dinner set suitable for family meals.",
    price: 2299,
    image: "https://m.media-amazon.com/images/I/61Z5tQUoGdL._SX679_.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Electric Kettle 1.5L",
    description: "Auto-shutoff stainless steel electric kettle.",
    price: 999,
    image: "https://m.media-amazon.com/images/I/71UpVb3zCXL._SX679_.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Cotton Bedsheet Set",
    description: "Double bedsheet with 2 pillow covers, 100% cotton.",
    price: 1199,
    image: "https://m.media-amazon.com/images/I/61nK7dE+EAL._SX679_.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "LED Desk Lamp",
    description: "Rechargeable desk lamp with adjustable brightness.",
    price: 899,
    image: "https://m.media-amazon.com/images/I/61dQ2emz4rL._SX679_.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Electric Mixer Grinder",
    description: "750W powerful mixer for smooth blending.",
    price: 2999,
    image: "https://m.media-amazon.com/images/I/61z1XjVwBQL._SX679_.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Wall Clock Modern Design",
    description: "Stylish analog wall clock for living rooms.",
    price: 899,
    image: "https://m.media-amazon.com/images/I/71Gffo9vTyL._SX679_.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Electric Rice Cooker",
    description: "Compact rice cooker with auto warm function.",
    price: 1899,
    image: "https://m.media-amazon.com/images/I/71MT3Tfb6zL._SX679_.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Set of 3 Storage Containers",
    description: "Airtight plastic containers for kitchen organization.",
    price: 699,
    image: "https://m.media-amazon.com/images/I/71MslFz4v-L._SX679_.jpg",
    category: "Home & Kitchen",
  },
  // ✅ Electronics (5 items)
{
  name: "Smart LED TV 43-inch Full HD",
  price: 25999,
  description:
    "43-inch Smart LED TV with built-in Wi-Fi, Netflix, and Prime Video support. Crisp picture and immersive sound.",
  image: "https://m.media-amazon.com/images/I/81QpkIctqPL._SL1500_.jpg",
  category: "Electronics",
},
{
  name: "Wireless Bluetooth Headphones",
  price: 1999,
  description:
    "Noise-cancelling over-ear Bluetooth headphones with 20-hour battery life and deep bass.",
  image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SL1500_.jpg",
  category: "Electronics",
},
{
  name: "Smartwatch Series X",
  price: 4499,
  description:
    "Track your fitness, heart rate, and notifications with the stylish Series X smartwatch.",
  image: "https://m.media-amazon.com/images/I/71Y8rH+R8OL._SL1500_.jpg",
  category: "Electronics",
},
{
  name: "Gaming Laptop 15.6-inch",
  price: 72999,
  description:
    "High-performance gaming laptop with Intel i7 processor, RTX 3050 GPU, and 16GB RAM for lag-free gaming.",
  image: "https://m.media-amazon.com/images/I/71AI8eQWM-L._SL1500_.jpg",
  category: "Electronics",
},
{
  name: "Portable Bluetooth Speaker",
  price: 1799,
  description:
    "Compact waterproof Bluetooth speaker with powerful sound, ideal for parties and travel.",
  image: "https://m.media-amazon.com/images/I/61q-3vS1n+L._SL1500_.jpg",
  category: "Electronics",
},

];

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    console.log("🧹 Old products removed");

    await Product.insertMany(products);
    console.log("🌱 New products inserted successfully");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();

const mongoose = require('mongoose')
const Product = require('./models/Product')
require('dotenv').config()

const data = [
  { name: 'pant', price: 499, description: 'Cotton tee', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSCz7k58ALGCAKZpRxtjD5WgR5Zwj7mwxuFg&s', countInStock: 20 },
  { name: 'jatti', price: 300, description: 'Comfortable sneakers', image: 'data:image/jpeg;base64,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', countInStock: 10 },
  { name: 'bottle', price: 199, description: 'Stylish bag', image: 'data:image/jpeg;base64,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', countInStock: 15 },
]

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany()
  await Product.insertMany(data)
  console.log('Data seeded!')
  process.exit()
})

