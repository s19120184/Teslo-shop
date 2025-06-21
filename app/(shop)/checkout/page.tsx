
import Tittle from "@/components/ui/title/Tittle";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  
];


export default function CheckoutPage() {
   return (
    <div className="flex  justify-center items-center   px-10 sm:px-0">
      <div className="flex flex-col  w-[1000px] ">
        <Tittle title="Verificar orden" />

        <div className="flex flex-col  sm:flex-row  justify-between items-center sm:items-start ">
          <div className="grid grid-cols-1 sm:grid-col-2 gap-10 ">
            {/*carrito */}
            <div className="flex flex-col mt-5">
              <span className="text-xl">Ajustar elementos</span>
              <Link href={"/cart"} className="underline mb-5">
                 Editar carrito
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
                  <p>${product.price} xl 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* checkout - Resumen de orden */}

          <div className="bg-white rounded-xl shadow-2xl p-7 mt-5 mb-10 sm:mt-5  ">

            <h2 className="text-2xl mb-2">Direccion de Entrega</h2>

            <div className="mb-10">
               <p className="text-xl">Luis Alvarez</p>
               <p>Av. Siempre viva</p>
               <p>Col. Centro</p>
               <p>Alcadia</p>
               <p>Guanajuato</p>
               <p>CP 12345</p>
               <p>123.123.123</p>
            </div>

            {/* divider */}

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>


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
               
               <p className="mb-5">
                 {/* Disclaimer */}
                 <span className="text-xs">
                   Al hacer clic en &quot; Colocar orden  &#34; , aceptas nuestros
                   <a href="#" className="underline"> terminos y condiciones </a> y
                   <a href="#" className="underline"> politicas de privacidad </a>
                 </span>
               </p>

              <Link
                className="flex btn-primary justify-center"
                href={"/orders/123"}
              >
                Colocar Orden
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
