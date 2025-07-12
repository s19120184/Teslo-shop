"use client";

import { getStockBySlug } from "@/actions/products/get-stock-by-slug";
import { titleFont } from "@/config/fonts";

import React, { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export default function StockLabel({ slug }: Props) {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoadiding] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const stock = await getStockBySlug(slug);
    setStock(stock);
    setIsLoadiding(false);
  };

  return (
    <>
      {!isLoading ? (
        <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {stock}
        </h1>
      ) : (
        <h1
          className={`${titleFont.className} antialiased font-bold text-lg bg-gray-300 animate-pulse`}
        >
          &nbsp;
        </h1>
      )}
    </>
  );
}
