
import Tittle from "@/components/ui/title/Tittle";


import Link from "next/link";
import React from "react";
import ProductsInCart from "./ui/ProductsInCart";
import PlaceOrder from "./ui/PlaceOrder";



export default function CheckoutPage() {
   return (
    <div className="flex  justify-center items-center   px-10 sm:px-0">
      <div className="flex flex-col  w-[1000px] ">
        <Tittle title="Verificar orden" />

        <div className="flex flex-col  sm:flex-row  justify-between items-center sm:items-start ">
          <div className="grid grid-cols-1 sm:grid-col-2 gap-10 m-5 ">
            {/*carrito */}
            <div className="flex flex-col mt-5">
              <span className="text-xl">Ajustar elementos</span>
              <Link href={"/cart"} className="underline mb-5">
                 Editar carrito
              </Link>
            </div>
            {/* items */}
             <ProductsInCart/>
          </div>

          {/* checkout - Resumen de orden */}
           
           <PlaceOrder/>
          
          {/* resumen fin */}
        </div>
        {/* fin items - orden */}
      </div>
    </div>
  );
}
