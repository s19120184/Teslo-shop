
import Tittle from "@/components/ui/title/Tittle";

import Link from "next/link";
// import { redirect } from "next/navigation";
import React from "react";
import ProductsInCart from "./ui/ProductsInCart";
import OrderSummaryCart from "./ui/OrderSummaryCart";


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
            {/* items productos en carrito */}
            <ProductsInCart/>
          </div>

          {/* checkout - Resumen de orden */}

          <div className="bg-white rounded-xl shadow-2xl p-7 mt-5 mb-10 sm:mt-5  ">
            <h2 className="text-2xl mb-2 ">Resumen de orden</h2>
             
             <OrderSummaryCart/>
            
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
