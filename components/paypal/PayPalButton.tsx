"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions
} from "@paypal/paypal-js";
import { setTransacctionId } from "@/actions/payments/setTransactionId";
import { paypalCheckPaymet } from "@/actions/payments/paypal-payment";

interface Props {
  orderId: string; // el id de nuestro orden
  amount: number; // el amount
}

export default function PayPalButton({ orderId, amount }: Props) {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmout = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded mt-2"></div>
      </div>
    );
  }

  //genera el id identificador de paypal
  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId, //asignamos el id de la orden para que se registre en paypal

          amount: {
            currency_code: 'MXN',
            value: `${roundedAmout}`
          }
        }
      ],
      intent: "CAPTURE"
    });

    //todo: guardar el Id en la orden en la base de datos
    const transacction = await setTransacctionId(transactionId, orderId);

    if (!transacction.ok) {
      throw new Error("No se puedo actualizar la orden");
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) return;
    
    await paypalCheckPaymet(details.id!);
  };

  return (
       <div className="relative z-0">

         <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
       </div>
      );
}

//onApprove se dispara cunado el proceso se realizo correctamente
