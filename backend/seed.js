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
