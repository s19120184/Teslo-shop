export const revalidate=60 // cada 60s

import { getPaginatedProductsWithImages } from "@/actions/products/products-paginations"
import ProductGrid from "@/components/products/productGrid/ProductGrid"
import Pagination from "@/components/ui/pagination/Pagination"
import Tittle from "@/components/ui/title/Tittle"
import { Gender } from "@prisma/client"

import { notFound, redirect } from "next/navigation"


interface Props {
  params: Promise<{gender :string}>,
  searchParams:Promise<{page?: string}> 
}


export default async function CategoryPage({params, searchParams}:Props) {

  const {gender } =await  params
  const { page } = await searchParams
  const pageN =  page ? parseInt(page) : 1


  const category = gender === 'men' && 'Para Hombre'  || gender === 'women' && 'Para Mujer' || gender === 'kid' && 'Para Niños' 
 
  if(!category){
    notFound()
  }

  const { totalPages, products} = await getPaginatedProductsWithImages({page: pageN, gender : gender as Gender })

   if(products.length ===0){
    redirect(`/gender/${gender}`) 
   }

  return (
    <div>
        <Tittle title={`${category} `}/>
         <ProductGrid  products={products}/> 
         <Pagination totalPage={totalPages}/>
    </div>
  )
}
