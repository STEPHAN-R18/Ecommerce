import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected for Seeding"))
  .catch((err) => console.log(err));

const products = [
  // 📚 BOOKS
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
    image: "https://m.media-amazon.com/images/I/61kRkfsIMUL._UF1000,1000_QL80_.jpg",
    category: "Books",
  },

  // 👕 MEN'S FASHION
  {
    name: "Men's Classic Fit Cotton Shirt",
    description: "Soft cotton shirt perfect for office and casual wear.",
    price: 899,
    image: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/2025/SEPTEMBER/19/eRUv3Zdp_ff661e697ec24d1e9bb83d9c8752b219.jpg",
    category: "Fashion",
  },
  {
    name: "Men's Slim Fit Jeans",
    description: "Comfortable stretch denim for everyday style.",
    price: 1299,
    image: "https://cdn.shopify.com/s/files/1/0555/4451/2817/files/RDG0001_1_1_480x480.jpg?v=1723447479",
    category: "Fashion",
  },
  {
    name: "Men's Black Hoodie",
    description: "Cozy fleece hoodie with front pockets.",
    price: 1499,
    image: "https://veirdo.in/cdn/shop/files/Everyday-Comfort-Men-s-Black-Regular-Solid-Fleece-Hoodie-Veirdo-1198.jpg?v=1754544980",
    category: "Fashion",
  },
  {
    name: "Men's Sports T-Shirt",
    description: "Breathable polyester fabric ideal for workouts.",
    price: 799,
    image: "https://strechgear.com/cdn/shop/files/43_f97243ec-06be-4ffc-85b3-85d679c13946.png?v=1709983459",
    category: "Fashion",
  },
  {
    name: "Men's Formal Trousers",
    description: "Slim-fit formal pants perfect for office or events.",
    price: 1199,
    image: "https://images.meesho.com/images/products/142481028/0hhnj_512.webp?width=512",
    category: "Fashion",
  },
  {
    name: "Men's Running Shoes",
    description: "Lightweight running shoes with breathable mesh upper.",
    price: 1799,
    image: "https://paragonfootwear.com/cdn/shop/products/k1015g_blk_1.jpg?v=1756716011&width=1920",
    category: "Fashion",
  },
  {
    name: "Men's Leather Belt",
    description: "Durable leather belt with classic buckle.",
    price: 699,
    image: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/25329050/2023/10/5/d7dabcb1-58c9-4722-bdfd-f5771ac0f84a1696481580095RoadsterMenVeganLeatherBelt1.jpg",
    category: "Fashion",
  },
  {
    name: "Men's Analog Wrist Watch",
    description: "Stylish analog watch with leather strap.",
    price: 2499,
    image: "https://images.meesho.com/images/products/67483258/ygfnu_512.webp?width=512",
    category: "Fashion",
  },

  // 👗 WOMEN'S FASHION
  {
    name: "Women's Floral Maxi Dress",
    description: "Beautiful floral printed dress for casual outings.",
    price: 1499,
    image: "https://www.vastranand.in/cdn/shop/files/3_7c1972c8-de21-4ca3-9367-2c143e926b9a.jpg?v=1743074435",
    category: "Fashion",
  },
  {
    name: "Women's Cotton Kurti",
    description: "Elegant and comfortable cotton kurti for daily wear.",
    price: 999,
    image: "https://m.media-amazon.com/images/I/910Vf1+b2gL._AC_UY1100_.jpg",
    category: "Fashion",
  },
  {
    name: "Women's Denim Jacket",
    description: "Trendy blue denim jacket with full sleeves.",
    price: 1899,
    image: "https://5.imimg.com/data5/ECOM/Default/2024/8/442602176/JE/RL/JQ/224397049/6701125396-500x500.jpg",
    category: "Fashion",
  },
  {
    name: "Women's Party Gown",
    description: "Long satin gown for evening parties.",
    price: 2999,
    image: "https://tiimg.tistatic.com/fp/1/008/268/party-wear-ladies-sleeveless-embroidered-gown-603.jpg",
    category: "Fashion",
  },
  {
    name: "Women's Casual Sneakers",
    description: "White sneakers with cushioned sole.",
    price: 1699,
    image: "https://tiimg.tistatic.com/fp/1/007/593/women-s-casual-sneakers-sports-comfortable-running-mesh-tennis-shoes-288.jpg",
    category: "Fashion",
  },
  {
    name: "Women's Leather Handbag",
    description: "Premium PU leather handbag with zip closure.",
    price: 1899,
    image: "https://m.media-amazon.com/images/I/61VoxqYxxkL._AC_UY1000_.jpg",
    category: "Fashion",
  },
  {
    name: "Women's Silver Earrings",
    description: "Elegant silver-plated earrings for formal events.",
    price: 499,
    image: "https://rubans.in/cdn/shop/files/rubans-silver-plated-pearls-cubic-zirconia-studded-oversized-premium-floral-stud-earrings-studs-earrings-1150858252.jpg?v=1755718877",
    category: "Fashion",
  },
  {
    name: "Women's Cotton Scarf",
    description: "Soft cotton scarf for all seasons.",
    price: 299,
    image: "https://content.jdmagicbox.com/quickquotes/images_main/unisex-festive-cotton-printed-scarf-802806509-86132pek.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit",
    category: "Fashion",
  },

  // 🏠 HOME & KITCHEN
  {
    name: "Non-stick Frying Pan",
    description: "Durable non-stick pan with heat-resistant handle.",
    price: 899,
    image: "https://www.rasoishop.com/cdn/shop/products/8901365375746-1.jpg?v=1680090526&width=1445",
    category: "Home & Kitchen",
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Leak-proof insulated bottle keeps water cool for 12 hours.",
    price: 749,
    image: "https://karavalicrafts.com/cdn/shop/products/Untitleddesign_5.png?v=1653333384",
    category: "Home & Kitchen",
  },
  {
    name: "Ceramic Dinner Set (18 pcs)",
    description: "Elegant dinner set suitable for family meals.",
    price: 2299,
    image: "https://5.imimg.com/data5/SELLER/Default/2025/5/508983007/DW/OZ/IX/149816971/whatsapp-image-2025-05-08-at-12-07-44-3bc3dbe1-250x250.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Electric Kettle 1.5L",
    description: "Auto-shutoff stainless steel electric kettle.",
    price: 999,
    image: "https://www.myg.in/images/thumbnails/300/300/detailed/73/Prestige_PKOSS-1-removebg-preview.png.png",
    category: "Home & Kitchen",
  },
  {
    name: "Cotton Bedsheet Set",
    description: "Double bedsheet with 2 pillow covers, 100% cotton.",
    price: 1199,
    image: "https://5.imimg.com/data5/SELLER/Default/2024/11/465910340/ND/HZ/WV/10824462/kanishk-cotton-bedsheet-set-500x500.jpeg",
    category: "Home & Kitchen",
  },
  {
    name: "LED Desk Lamp",
    description: "Rechargeable desk lamp with adjustable brightness.",
    price: 899,
    image: "https://ii1.pepperfry.com/media/catalog/product/m/u/1100x1210/multicolor-shade-table-lamp-with-black-metal-base-multicolor-shade-table-lamp-with-black-metal-base-rbegqb.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Electric Mixer Grinder",
    description: "750W powerful mixer for smooth blending.",
    price: 2999,
    image: "https://www.vidiem.in/uploads/images/ADC_Azure_Blue7.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Wall Clock Modern Design",
    description: "Stylish analog wall clock for living rooms.",
    price: 899,
    image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw6ef4a954/images/Titan/Catalog/W0046PA01_1.jpg?sw=800&sh=800",
    category: "Home & Kitchen",
  },
  {
    name: "Electric Rice Cooker",
    description: "Compact rice cooker with auto warm function.",
    price: 1899,
    image: "https://m.media-amazon.com/images/I/61K4QuaKiQL._AC_UF894,1000_QL80_.jpg",
    category: "Home & Kitchen",
  },
  {
    name: "Set of 3 Storage Containers",
    description: "Airtight plastic containers for kitchen organization.",
    price: 199,
    image: "https://www.rasoishop.com/cdn/shop/files/02_2cd7ad73-bbe0-4f36-8a1e-974fb1711a3e.jpg?v=1709644227&width=1445",
    category: "Home & Kitchen",
  },

  // ⚡ ELECTRONICS
  {
    name: "Smart LED TV 43-inch Full HD",
    price: 25999,
    description: "43-inch Smart LED TV with built-in Wi-Fi and streaming apps.",
    image: "https://m.media-amazon.com/images/I/81QpkIctqPL._SL1500_.jpg",
    category: "Electronics",
  },
  {
    name: "Wireless Bluetooth Headphones",
    price: 1999,
    description: "Noise-cancelling over-ear Bluetooth headphones with 20-hour battery life.",
    image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SL1500_.jpg",
    category: "Electronics",
  },
  {
    name: "Smartwatch Series X",
    price: 4499,
    description: "Track your fitness and heart rate with the stylish Series X smartwatch.",
    image: "https://images.priceoye.pk/kalobee-gw-x-series-10-smart-watch-pakistan-priceoye-a2eji-500x500.webp",
    category: "Electronics",
  },
  {
    name: "Gaming Laptop 15.6-inch",
    price: 72999,
    description: "High-performance laptop with Intel i7, RTX 3050 GPU, and 16GB RAM.",
    image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Computers%20Peripherals/Laptop/Images/273309_0_apzfms.png",
    category: "Electronics",
  },
  {
    name: "Portable Bluetooth Speaker",
    price: 1799,
    description: "Compact waterproof Bluetooth speaker with deep bass.",
    image: "https://www.boat-lifestyle.com/cdn/shop/files/Stone_SpinXPro_1_b3503890-50f6-4cd1-9138-0bd90874391e_1300x.png?v=1709717442",
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
    console.error("❌ Error during seeding:", err);
    process.exit(1);
  }
};

seedProducts();
