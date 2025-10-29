import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  return (
    <>
      <Navbar />

      <div className="home-container">
        <h1 className="home-title">Available Products</h1>
        <div className="product-grid">
          {products.length === 0 ? (
            <p className="no-products">No products available.</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className="product-card">
                <img
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                />
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>

                <div className="button-group">
                  <button
                    className="btn view"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn edit"
                    onClick={() => navigate(`/edit/${product._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
