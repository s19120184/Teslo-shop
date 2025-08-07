import { getPaginatedOrders } from "@/actions/order/get-pagineted-orders";
import { getPaginatedProductsWithImages } from "@/actions/products/products-paginations";
import Pagination from "@/components/ui/pagination/Pagination";
import Tittle from "@/components/ui/title/Tittle";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { currencyFormat } from "@/src/utils/currencyFormat";
import ProductImage from "@/components/product-image/ProductImage";


interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function ProductsPageAdmn({ searchParams }: Props) {
  const { ok } = await getPaginatedOrders();

  const { page } = await searchParams;

  const pageN = page ? parseInt(page) : 1;

  const { totalPages, products } = await getPaginatedProductsWithImages({
    page: pageN
  });

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Tittle title="Mantenimiento de productos" />

      <div className="flex justify-end mb-5">
        <Link href={"/admin/product/new"} className="btn-primary m-4 sm:m-0">
          Nuevo producto
        </Link>
      </div>

      <div className=" mb-10 ">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b border-gray-200 ">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Titulo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Genero
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Inventario
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b border-gray-200 transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                     <ProductImage 
                         alt={product.ProductImage[0]?.url} 
                          width={70} 
                          height={70}  
                          className="w-20 h-20 object-cover rounded"                      
                          src={product.images[0]}
                     />
                  </Link>
                  
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                   <Link href={`/admin/product/${product.slug}`}>
                      {product.title}
                   </Link>
                </td>
                <td className=" text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  
                   {product.gender}
                </td>
                 <td className="text-sm text-gray-900 font-light px-6 ">
                  
                   {product.inStock}
                </td>
                 <td className="text-sm text-gray-900 font-light px-6 ">
                  
                   {product.sizes.map(size=> size + ' ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalPage={totalPages} />
    </>
  );
}
