
export const revalidate=60 // cada 60s

import { getPaginatedProductsWithImages } from "@/actions/products/products-paginations";
import ProductGrid from "@/components/products/productGrid/ProductGrid";
import Pagination from "@/components/ui/pagination/Pagination";
import Tittle from "@/components/ui/title/Tittle";
import { redirect } from "next/navigation";
//import { initialData } from "@/seed/seed";


//const products = initialData.products
interface Props {
  searchParams:Promise<{
    page?:string,
  }>
}

export default async function Home({searchParams}:Props) {

  const {page} = await searchParams

  const pageN = page ? parseInt(page) : 1

  const { totalPages, products} = await getPaginatedProductsWithImages({page:pageN});

  //redireccinar a la primera pagina en cuandno ya no hay productos
  if(products.length ===0 ) {
    redirect('/')
  }

  return (
       <>
        <Tittle  title="Tienda" subtitle="Todos los productos" className="mb-2"/>
          <ProductGrid products={products}/>
          <Pagination totalPage={totalPages} />
       </>

       
  );
}
