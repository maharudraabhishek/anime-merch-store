import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../api/index.js';
import { CartContext } from '../context/CartContext.jsx';

/**
 * Displays detailed information about a single product.  Fetches the
 * product data using the id from the URL.  Integrates with the
 * CartContext to allow adding the product to the shopping cart.
 */
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleAdd = () => {
    addToCart(product, 1);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 md:h-auto object-cover rounded-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
          <p className="text-xl text-secondary mb-4">₹{product.price.toFixed(2)}</p>
          <p className="mb-4 text-gray-700 dark:text-gray-300">{product.description}</p>
          <button
            onClick={handleAdd}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
