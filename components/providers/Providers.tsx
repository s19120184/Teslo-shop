"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
        intent:'capture',
        currency:'MXN'
      }}
    >
      <SessionProvider>{children}</SessionProvider>
    </PayPalScriptProvider>
  );
}
