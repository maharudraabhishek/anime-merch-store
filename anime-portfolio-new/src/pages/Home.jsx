import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductList from '../components/ProductList.jsx';
import { fetchProducts } from '../api/index.js';

/**
 * The home page acts as the entry point into the store.  It features a
 * hero carousel, a bestseller section that highlights the top
 * products (based on price in this demo), and the full collection
 * below.
 */
const Home = () => {
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    const load = async () => {
      const all = await fetchProducts();
      // Choose the most expensive items as "bestsellers" for the demo
      const sorted = [...all].sort((a, b) => b.price - a.price);
      setBestsellers(sorted.slice(0, 4));
    };
    load();
  }, []);

  return (
    <div className="space-y-8">
      <Carousel />
      <section>
        <h2 className="text-2xl font-semibold mb-4">Bestsellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section>
        <ProductList />
      </section>
    </div>
  );
};

export default Home;