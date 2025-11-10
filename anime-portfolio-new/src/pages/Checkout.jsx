import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { createOrder } from "../api/index.js";

export default function Checkout() {
  const { cart, total, clearCart } = useContext(CartContext);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      setSubmitting(true);
      const payload = {
        items: cart.map(({ id, title, price, qty }) => ({ id, title, price, qty })),
        total,
      };
      await createOrder(payload);
      clearCart();
      navigate("/orders?success=1");
    } finally {
      setSubmitting(false);
    }
  };

  if (!cart.length) return <div className="p-6">No items in cart.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <div className="border rounded-md p-3 mb-4">
        {cart.map((i) => (
          <div key={i.id} className="flex justify-between py-1">
            <div>{i.title} × {i.qty}</div>
            <div>₹{i.price * i.qty}</div>
          </div>
        ))}
        <div className="border-t mt-2 pt-2 flex justify-between font-medium">
          <div>Total</div><div>₹{total}</div>
        </div>
      </div>
      <button
        disabled={submitting}
        onClick={placeOrder}
        className="rounded px-4 py-2 bg-primary text-primary-foreground disabled:opacity-50"
      >
        {submitting ? "Placing…" : "Place order"}
      </button>
    </div>
  );
}
