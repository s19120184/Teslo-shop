"use client";

import { placeOrder } from "@/actions/order/place-order";
import ErrorInput from "@/components/ui/errors/ErrorInput";
import { useAddressStore } from "@/src/store/address/address-store";
import { useCartStore } from "@/src/store/cart/cart-store";
import { currencyFormat } from "@/src/utils/currencyFormat";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PlaceOrder() {

  const router = useRouter()
  const [loaded, setLoaded] = useState(false);
  const [errorAction, setErrorAction] = useState('')

  //
  const [isPlacingOrder,setIsPlacingOrder ] = useState(false)

  const address = useAddressStore((state) => state.address);

  //storage cart
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore(state => state.cleaarCart)

  // const {itemsInCart, subsTotal,tax,total} = getSumaryInformation()

  //resumen de la orden
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


  const onPlaceOrder =async()=>{
    setIsPlacingOrder(true)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {rememberAddress , ...restAdress}= address
    
    //obtenemos los productos del carriot solo el id la cantidad y el size
    const productsToOrder = cart.map(product =>({
        productId: product.id,
        quantity:product.quantity,
        size:product.size
    }))



    //! server action
    const resp =await placeOrder(productsToOrder, address)
    if(!resp.ok){
        setIsPlacingOrder(false)
        setErrorAction(resp.message)
        return
    }

    //* todo salio bien
    //limpiar el carrito y redireccionar
    clearCart()
    //redireccion junto con el id
    router.replace('/orders/'+resp.order)

  }

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl p-7 mt-5 mb-10 sm:mt-5  ">
      <h2 className="text-2xl mb-2">Direccion de Entrega</h2>

      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>
          {address.city} {address.country}
        </p>
        <p>CP {address.postalCode}</p>
        <p>{address.phone}</p>
      </div>

      {/* divider */}

      <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

      <h2 className="text-2xl mb-2 ">Resumen de orden</h2>

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

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en &quot; Colocar orden &#34; , aceptas nuestros
            <a href="#" className="underline">
              {" "}
              terminos y condiciones{" "}
            </a>{" "}
            y
            <a href="#" className="underline">
              {" "}
              politicas de privacidad{" "}
            </a>
          </span>
        </p>

        <button
          className={clsx({
             'btn-primary': !isPlacingOrder,
             'btn-disable': isPlacingOrder
          })}
          onClick={onPlaceOrder}

          // href={"/orders/123"}
        >
          Colocar Orden
        </button>
        {<ErrorInput message={errorAction} style="top-3 flex"/>}
      </div>
    </div>
  );
}
