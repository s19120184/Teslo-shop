"use server";

import { auth } from "@/src/auth.config";
import { Address } from "@/src/interfaces/address.interface";
import { Size } from "@/src/interfaces/product.interface";
import { prisma } from "@/src/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  //verificar sesion de usuario
  const session = await auth();

  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: "No hay sesion de usuario"
    };
  }

  //console.log({productIds, address, userId})
  //obtener la informacion de los productos
  //nota: podems llevar 2+ productos con el mismo id

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId)
      }
    }
  });


  //calcular los montos //encabezado
  const itemsInorder = productIds.reduce(
    (count, producto) => count + producto.quantity,
    0
  );

  //los totales de tax, subtotal y total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subTotal = product.price * productQuantity;
      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  ); //end reduce

  console.log({ subTotal, tax, total });

  //**crear la transaccion
  try {

     const prismaTx = await prisma.$transaction(async (tx) => {
    //1.actualizar el stock de los productos

    const updatedProductPromises = products.map((product) => {
      //acumular los valores cuanod un poducto tiene el mismo id pero distinta talla
      const productQuantity = productIds
        .filter((p) => p.productId === product.id)
        .reduce((acumulado, item) => item.quantity + acumulado, 0);

      if (productQuantity === 0) {
        throw new Error(`${product.id} No tiene cantidad definida`);
      }

      return tx.product.update({
        where: {
          id: product.id
        },
        data: {
          inStock: {
            decrement: productQuantity
          }
        }
      });
    });

    const updateProducts = await Promise.all(updatedProductPromises)

    //verificar valors negaticos en las existecia = no hay stock
    updateProducts.forEach(product=>{
       if(product.inStock < 0) {
          throw new Error(`${product.title} No tiene stock`)
       }
    })

    //2.Crear la order - Encabezado - Detalles
    const order = await tx.order.create({
      data: {
        userId: userId,
        itemsInOrder: itemsInorder,
        subTotal: subTotal,
        tax: tax,
        total: total,
        orderItem: {
          createMany: {
            data: productIds.map((p) => ({
              quantity: p.quantity,
              size: p.size,
              productId: p.productId,
              price:
                products.find((product) => product.id === p.productId)!.price ||
                0
            }))
          }
        }
      }
    });

    //validar si el price es cero lanzar una exepcion

    //3.Crear direccion de la orden
    const addressOrder = await tx.orderAddress.create({
      data: {
        firstName: address.firstName,
        lastName: address.lastName,
        address: address.address,
        address2: address.address2 ? address.address2 : "",
        postalCode: address.postalCode,
        city: address.city,
        phone: address.phone,
        countryId: address.country,
        orderId: order.id
      }
    });

    return {
      order: order,
      updateProducts:updateProducts,
      orderAddress: addressOrder
    };
  });

  return {
    ok:true,
    order: prismaTx.order,
    prismaTx: prismaTx
  }
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
      return{
        ok:false,
        message:error.message
      }
  }

 
};

//documentacion de transaccines https://www.prisma.io/docs/orm/prisma-client/queries/transactions#interactive-transactions
