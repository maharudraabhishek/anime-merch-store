import React, { createContext, useMemo, useState } from "react";

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQty: () => {},
  clearCart: () => {},
  total: 0,
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, qty = 1) => {
    if (!product?.id) return;
    setCart((prev) => {
      const i = prev.findIndex((x) => x.id === product.id);
      if (i === -1) return [...prev, { ...product, qty }];
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + qty };
      return next;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((x) => x.id !== productId));
  };

  const updateQty = (productId, qty) => {
    setCart((prev) =>
      prev.map((x) => (x.id === productId ? { ...x, qty: Math.max(1, qty) } : x))
    );
  };

  const clearCart = () => setCart([]);

  const total = useMemo(
    () => cart.reduce((sum, i) => sum + Number(i.price || 0) * Number(i.qty || 1), 0),
    [cart]
  );

  const value = { cart, addToCart, removeFromCart, updateQty, clearCart, total };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
