"use client";

import { useCartStore } from "@/src/store/cart/cart-store";
import { currencyFormat } from "@/src/utils/currencyFormat";

import React, { useEffect, useState } from "react";

export default function OrderSummaryCart() {
  const [loaded, setLoaded] = useState(false);

  const cart = useCartStore((state) => state.cart);

  // const {itemsInCart, subsTotal,tax,total} = getSumaryInformation()

  const subsTotal = cart.reduce(
    (total, item) => item.quantity * item.price + total,
    0
  );

  const tax = subsTotal * 0.15;
  const total = subsTotal + tax;
  const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{itemsInCart} articulos</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subsTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
}
