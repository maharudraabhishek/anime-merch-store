import React, { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, total, removeFromCart, updateQty } = useContext(CartContext);
  if (!cart.length)
    return <div className="p-6">Your cart is empty. <Link to="/products" className="text-primary underline">Browse products</Link></div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border rounded-md p-3">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <div className="font-medium">{item.title}</div>
              <div className="opacity-75">₹{item.price}</div>
              <div className="flex items-center gap-2 mt-2">
                <button className="px-2 border rounded" onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                <span>{item.qty}</span>
                <button className="px-2 border rounded" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                <button className="ml-4 text-destructive underline" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <div className="text-lg">Subtotal: <b>₹{total}</b></div>
        <Link to="/checkout" className="inline-block mt-3 rounded px-4 py-2 bg-primary text-primary-foreground">
          Go to checkout
        </Link>
      </div>
    </div>
  );
}
