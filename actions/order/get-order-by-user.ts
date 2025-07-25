"use server";

import { auth } from "@/src/auth.config";
import { prisma } from "@/src/lib/prisma";

export const getOrderByUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe estar autenticado"
    };
  }
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });

    return {
      ok: true,
      orders
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al obtener la orden"
    };
  }
};
