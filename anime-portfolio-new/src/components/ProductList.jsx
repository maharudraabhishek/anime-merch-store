import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import { fetchProducts } from '../api/index.js';

/**
 * Displays a list of products with optional category filtering.  When the
 * component mounts it fetches product data from the backend.  The user
 * can filter by category using a dropdown.  Products are sorted
 * alphabetically for determinism.
 */
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
      const unique = Array.from(new Set(data.map((p) => p.category)));
      setCategories(unique);
    };
    load();
  }, []);

  const filtered = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Our Collection</h2>
        <select
          className="border rounded px-2 py-1 bg-card text-foreground"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {filtered.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.sort((a, b) => a.title.localeCompare(b.title)).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;