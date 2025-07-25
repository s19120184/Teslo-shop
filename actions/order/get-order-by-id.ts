"use server";

import { auth } from "@/src/auth.config";
import { prisma } from "@/src/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe estar autenticado"
    };
  }

  try {
    const order = await prisma.order.findFirst({
      where: {
        id: id
      },
      include: {
        orderItem: true,
        OrderAddress: true
      }
    });

    if (!order) {
      return {
        ok: false,
        message: "Error"
      };
    } else {
      const productsImges = await prisma.productImage.findMany({
        where: {
          productId: {
            in: order?.orderItem.map((p) => p.productId)
          }
        },
        include: {
          product: true
        }
      });

      return {
        orderItem: order.orderItem.map((item) => {
          return {
            item,
            productsImges: productsImges.find(
              (img) => img.productId === item.productId
            )?.url,
            product: productsImges.find((p) => p.product.id === item.productId)
          };
        }),
        orderAddress: order.OrderAddress,
        order
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se encontro la orden"
    };
  }
};
