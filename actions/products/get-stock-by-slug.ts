"use server";

import { prisma } from "@/src/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    const stock = await prisma.product.findFirst({
      where: {
        slug: slug
      },
      select: { inStock: true }
    });

    if (!stock) return 0;

    return stock.inStock;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el stock");
  }
};
