"use server";

import { PayPalOrderStatus } from "@/src/interfaces/paypal.interfaces";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPaymet = async (paypalTransactionId: string) => {
  try {
    const authToken = await getPaypPalBerrerToken();

    if (!authToken) {
      return {
        ok: false,
        message: "No se puedo obtener el token de verificacion"
      };
    }
    
    //obtener la informacion de pago
    const response = await verifyPayPalPayment(paypalTransactionId, authToken)

    if(!response){
      return{
        ok:false,
        message:'Error al verificar el pago'
      }
    }

    const {status, purchase_units } = response

    if(status !== 'COMPLETED'){
      return{
        ok:false,
        message:"No se pudo completar la compra"
      }
    }

    //todo: invoice ID
     const { invoice_id : orderId }= purchase_units[0]

   //todo: realizar la actualizacion de pago en la base de datos
    await prisma.order.update({
      where:{id: orderId },
      data:{
        isPaid:true,
        paidAt:new Date()
      }
    })

    //! revalidar el path
    revalidatePath(`/orders/${orderId}`)
    
  } catch (error) {
    console.log(error);
    return{
      ok:false,
      message:"No se Pudo completar la transaccion"
    }
  }
};

const getPaypPalBerrerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded
  };

  try {
    const result = await fetch(oauth2Url,{ ...requestOptions , cache:'no-store'}).then((r) => r.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
):Promise<PayPalOrderStatus | null> => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const payPalOrders = process.env.PAYPAL_ORDERS_URL ;

  const requestOptions = {
    method: "GET",
    headers: myHeaders
    // redirect: "follow"
  };

  try {
   const response= await fetch(`${payPalOrders}/${paypalTransactionId}`,{
       ...requestOptions,
       cache:'no-store',
   }).then(
      (response) => response.json()
    );

    return response
  } catch (error) {
    console.log(error);
    return null
  }
};
