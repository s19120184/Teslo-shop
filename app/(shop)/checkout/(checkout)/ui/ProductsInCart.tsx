"use client";

import ProductImage from "@/components/product-image/ProductImage";
import { CartProduct } from "@/src/interfaces/product.interface";
import { useCartStore } from "@/src/store/cart/cart-store";
import { currencyFormat } from "@/src/utils/currencyFormat";


import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProductsInCart() {
  const [loaded, setLoadeded] = useState(false);

  useEffect(() => {
    setLoadeded(true);
  }, []);

  const cart = useCartStore((state) => state.cart);
  if (cart.length === 0) {
    redirect("/");
  }


  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {cart.map((product: CartProduct) => (
        <div className="flex mb-2" key={`${product.slug}-${product.size}`}>
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            alt={product.title}
            className="mr-5 rounded"
           
          />
          <div>
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>

            <p className="font-bold"> {currencyFormat(product.price * product.quantity)}</p>
           
          </div>
        </div>
      ))}
    </>
  );
}
