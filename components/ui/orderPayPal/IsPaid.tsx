import clsx from "clsx";
import React from "react";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  isPaid: boolean;
}

export default function IsPaid({ isPaid }: Props) {
  return (
    <div className="flex flex-col mt-5">
      <div
        className={clsx(
          "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
          {
            "bg-red-500": !isPaid,
            "bg-green-700": isPaid
          }
        )}
      >
        <IoCardOutline size={30} />
        {/* <span>Pendiente de pago</span> */}
        <span>{isPaid ? "Orden Pagada" : "Orden No paganda"}</span>
      </div>
    </div>
  );
}
