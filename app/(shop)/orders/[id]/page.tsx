import { getOrderById } from "@/actions/order/get-order-by-id";
import PayPalButton from "@/components/paypal/PayPalButton";
import ProductImage from "@/components/product-image/ProductImage";
import ErrorInput from "@/components/ui/errors/ErrorInput";
import IsPaid from "@/components/ui/orderPayPal/IsPaid";
import Tittle from "@/components/ui/title/Tittle";

import { currencyFormat } from "@/src/utils/currencyFormat";

import React from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  //todo: verificar
  const data = await getOrderById(id);

  const { orderItem, orderAddress, message, order } = data;

  //  if(message !== '' || message !== undefined){
  //     notFound()
  //  }

  if (order && orderItem)
    return (
      <div className="flex  justify-center items-center   px-10 sm:px-0">
        <div className="flex flex-col  w-[1000px] ">
          <Tittle title={`Orden #${id.substring(id.length-10)}`} />

          {message && <ErrorInput message={message} />}

          <div className="flex flex-col  sm:flex-row  justify-center gap-10 items-center sm:items-start ">
            <div className="grid grid-cols-1 sm:grid-col-2 gap-10 ">
              {/*carrito */}
              <IsPaid isPaid={order.isPaid} />
              {/* items */}
              {orderItem.map((order) => (
                <div
                  className="flex mb-2"
                  key={order.product?.product.slug + order.item.id}
                >
                  <ProductImage
                    src={order.productsImges}
                    width={100}
                    height={100}
                    alt={order.product?.product.title || ""}
                    className="mr-5 rounded"
                    style={{
                      width: 100,
                      height: 100
                    }}
                  />
                  <div>
                    <p>{order.product?.product.title}</p>
                    <p>
                      {currencyFormat(order.item.price)} -{order.item.size} x{" "}
                      {order.item.quantity}
                    </p>
                    <p className="font-bold">
                      Subtotal: ${order.item.quantity * order.item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* checkout - Resumen de orden */}

            <div className="bg-white rounded-xl shadow-2xl p-7 mt-5 mb-10 sm:mt-5  ">
              <h2 className="text-2xl mb-2">Direccion de Entrega</h2>

              <div className="mb-10">
                <p className="text-xl">
                  {orderAddress?.firstName} {orderAddress?.lastName}
                </p>
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
                <span className="text-right">
                  {order?.itemsInOrder} productos
                </span>

                <span>Subtotal</span>
                <span className="text-right">
                  {currencyFormat(order.subTotal)}
                </span>

                <span>Impuestos (15%)</span>
                <span className="text-right">{currencyFormat(order.tax)}</span>

                <span className="mt-5 text-2xl">Total:</span>
                <span className="mt-5 text-2xl text-right">
                  {currencyFormat(order.total)}
                </span>
              </div>

              <div className="mt-5 mb-2 w-full">
                {order.isPaid ? (
                  <IsPaid isPaid={order.isPaid} />
                ) : (
                  <PayPalButton amount={order.total} orderId={order.id} />
                )}
              </div>
            </div>
            {/* resumen fin */}
          </div>
          {/* fin items - orden */}
        </div>
      </div>
    );
}
