import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { getPinImage } from "../lib/pinImages.js";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const onAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const img = getPinImage(product?.title);

  return (
    <Link
      to={`/products/${product.id}`}
      className="block rounded-lg border hover:shadow-md transition"
    >
      <img
        src={img}
        alt={product.title}
        className="w-full h-56 object-cover rounded-t-lg"
        loading="lazy"
      />
      <div className="p-3">
        <h3 className="font-medium">{product.title}</h3>
        <p className="text-sm opacity-80 mb-3">₹{product.price}</p>

        <button
          type="button"
          onClick={onAdd}
          className="w-full rounded-md px-3 py-2 bg-primary text-primary-foreground hover:opacity-90"
        >
          Add to cart
        </button>
      </div>
    </Link>
  );
}
