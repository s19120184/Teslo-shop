import QuantitySelector from "@/components/product/quantitySelector/QuantitySelector";
import Tittle from "@/components/ui/title/Tittle";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
// import { redirect } from "next/navigation";
import React from "react";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
  initialData.products[4],
  initialData.products[5],
];

export default function CartPage() {

  
  // redirect('/empty')
  
  return (
    <div className="flex  justify-center items-center   px-10 sm:px-0">
      <div className="flex flex-col  w-[1000px] ">
        <Tittle title="Carrito" />

        <div className="flex flex-col  sm:flex-row  justify-center gap-5 items-center sm:items-start ">
          <div className="grid grid-cols-1 sm:grid-col-2 gap-10 ">
            {/*carrito */}
            <div className="flex flex-col mt-5">
              <span className="text-xl">Agregar más Items</span>
              <Link href={"/"} className="underline mb-5">
                Contiúa comprando
              </Link>
            </div>
            {/* items */}
            {productsInCart.map((product) => (
              <div className="flex mb-2" key={product.slug}>
                <Image
                  src={`/products/${product.images[0]}`}
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
                  <p>{product.title}</p>
                  <p>${product.price}</p>
                  <QuantitySelector quantity={3} />
                  <button className="underline mt-3">Remover</button>
                </div>
              </div>
            ))}
          </div>

          {/* checkout - Resumen de orden */}

          <div className="bg-white rounded-xl shadow-2xl p-7 mt-5 mb-10 sm:mt-5  ">
            <h2 className="text-2xl mb-2 ">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 articulos</span>

              <span>Subtotal</span>
              <span className="text-right">$400</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href={"/checkout/address"}
              >
                Checkout
              </Link>
            </div>
          </div>
          {/* resumen fin */}
        </div>
        {/* fin items - orden */}
      </div>
    </div>
  );
}
