"use client";
import ProductImage from "@/components/product-image/ProductImage";
import QuantitySelector from "@/components/product/quantitySelector/QuantitySelector";
import { CartProduct } from "@/src/interfaces/product.interface";
import { useCartStore } from "@/src/store/cart/cart-store";


import Link from "next/link";
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
  const uptdatedProductQuantity = useCartStore(
    (state) => state.uptdatedProductQuantity
  );

  const removeProduct = useCartStore((state) => state.removeProduct);

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
            style={{
              width:100,
              height:100
            }}
           
          />
          <div>
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              <p>
                {product.size} - {product.title}
              </p>
            </Link>

            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                uptdatedProductQuantity(quantity, product)
              }
            />
            <button
              onClick={() => removeProduct(product)}
              className="underline mt-3"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
