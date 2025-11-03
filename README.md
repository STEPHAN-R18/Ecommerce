## ⚙️ Tech Stack

Frontend:  
- React (Vite)
- Axios  
- React Router DOM  
- Tailwind CSS (optional styling)

Backend:  
- Node.js  
- Express.js  
- Mongoose  
- dotenv  
- cors  
- nodemon (for development)

Database:  
- MongoDB (Atlas or local instance)

---

## 🧩 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/mern-ecommerce.git
cd ecommerce-app

2️⃣ Setup the backend
cd backend
npm install

📦 Required backend packages
npm install express mongoose cors dotenv
npm install nodemon --save-dev

Create .env file in backend folder:
MONGO_URI=your_mongodb_connection_string
PORT=5000

Seed products (optional)
To populate your database with demo products:
node seed.js

Run backend server
npm start

Backend will run at:
👉 http://localhost:5000
------------------------------------------------------------------------------------------------

3️⃣ Setup the frontend
cd ../frontend
npm install

📦 Required frontend packages
npm install axios react-router-dom

Run frontend app
npm run dev

Frontend will run at:
👉 http://localhost:5173
------------------------------------------------------------------------------------------------

🧑‍💻 Developer Notes
+ Make sure MongoDB connection is valid before running backend.
+ Always run backend first (npm start in backend).
+ Then run frontend (npm run dev in frontend).
+ If git push fails, commit and pull before retrying.
+ To resolve merge conflicts, open VS Code Source Control → Merge Changes → Resolve → Commit → Push.
------------------------------------------------------------------------------------------------

🧠 Key Files Explained

backend/models/Product.js                 → Defines Product schema (name, price, description, category, image)
backend/routes/productRoutes.js           → API endpoints for fetching products
backend/seed.js                           → Inserts demo data (Books, Electronics, Fashion, Home & Kitchen)

frontend/src/components/ProductList.jsx   → Displays all products with category filter
frontend/src/components/ProductDetail.jsx → Flipkart-style product details page
frontend/src/components/Header.jsx        → Contains search bar, cart, and profile options





