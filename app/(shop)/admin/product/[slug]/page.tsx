import { getProductBySlug } from '@/actions/products/get-product-by-slug';
import Tittle from '@/components/ui/title/Tittle';
import { redirect } from 'next/navigation';
import React from 'react'

import { getCategories } from '@/actions/categories/get-categories';
import ProductFormAdmin from './ui/ProductFormAdmin';



interface Props {
   params:Promise<{
     slug:string;
   }>
}


export default async function ProductAdminPage({params}:Props) {

   const {slug} = await params

   console.log(slug)


   const [product, categories] = await Promise.all([
       getProductBySlug(slug),
       getCategories()
   ])


   //todo: new
   if(!product && slug !=='new') {
    redirect('/admin/products')
   }

   const tittle = slug === 'new' ? 'Nuevo producto' : 'Editar Producto'

  if(categories.ok)
  return (
    <>
       <Tittle title={tittle} />
       <ProductFormAdmin product={product ?? {}} categories={categories.categories}/>
    </>
  )
}
