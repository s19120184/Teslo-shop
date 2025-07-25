
import { getOrderById } from "@/actions/order/get-order-by-id";
import ErrorInput from "@/components/ui/errors/ErrorInput";
import Tittle from "@/components/ui/title/Tittle";

import { currencyFormat } from "@/src/utils/currencyFormat";
import clsx from "clsx";
import Image from "next/image";


import React from "react";
import { IoCardOutline } from "react-icons/io5";


interface  Props {
  params:Promise<{
    id:string
  }>
}

export default async function OrderPage({params}:Props) {
  const {id} =await params

 
  //todo: verificar
  const data = await getOrderById(id)
 
  
 const  {orderItem, orderAddress, message ,order ,  } =  data

   
    
  //  if(message !== '' || message !== undefined){
  //     notFound()
  //  }

 if(order && orderItem)
  return (
    <div className="flex  justify-center items-center   px-10 sm:px-0">
      <div className="flex flex-col  w-[1000px] ">
        <Tittle title={`Orden #${id}`} />
        
        {message && ( <ErrorInput message={message}/>)}

        <div className="flex flex-col  sm:flex-row  justify-center gap-10 items-center sm:items-start ">
          <div className="grid grid-cols-1 sm:grid-col-2 gap-10 ">
            {/*carrito */}
            <div className="flex flex-col mt-5">

              <div className={
                 clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                     'bg-red-500' : !order.isPaid,
                     'bg-green-700': order.isPaid
                  }
                 )
              }>
                 <IoCardOutline size={30} />
                 {/* <span>Pendiente de pago</span> */}
                 <span>{order.isPaid ? ('Orden Pagada') : ('Orden No paganda')}</span>

              </div>
                
            </div>
            {/* items */}
            {orderItem.map((order) => (
              <div className="flex mb-2" key={order.product?.product.slug + order.item.id}>
                <Image
                  src={`/products/${order.productsImges}`}
                  width={100}
                  height={100}
                  alt={order.product?.product.title || ''}
                  className="mr-5 rounded"
                  style={{
                     width:100,
                     height:100
                  }}
                />
                <div>
                  <p>{order.product?.product.title}</p>
                  <p>{currencyFormat(order.item.price)} -{order.item.size} x { order.item.quantity}</p>
                  <p className="font-bold">Subtotal: ${order.item.quantity * order.item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* checkout - Resumen de orden */}

          <div className="bg-white rounded-xl shadow-2xl p-7 mt-5 mb-10 sm:mt-5  ">

            <h2 className="text-2xl mb-2">Direccion de Entrega</h2>

            <div className="mb-10">
               <p className="text-xl">{orderAddress?.firstName} {orderAddress?.lastName}</p>
               <p>Calle: {orderAddress?.address}</p>
               <p>Ciudad: {orderAddress?.city}</p>
               <p>CP {orderAddress?.postalCode}</p>
               <p>Telefono: {orderAddress?.phone}</p>
            </div>

            {/* divider */}

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>


            <h2 className="text-2xl mb-2 ">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">{order?.itemsInOrder} productos</span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order.subTotal)}</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order.tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">{order.total}</span>
            </div>

            <div className="mt-5 mb-2 w-full">


               <div className={
                 clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                     'bg-red-500' : !order.isPaid,
                     'bg-green-700': order.isPaid
                  }
                 )
              }>
                 <IoCardOutline size={30} />
                 {/* <span>Pendiente de pago</span> */}
                 <span>{order.isPaid ? ('Orden Pagada') : ('Orden No paganda')}</span>

              </div>
               
            </div>
          </div>
          {/* resumen fin */}
        </div>
        {/* fin items - orden */}
      </div>
    </div>
  );
}
