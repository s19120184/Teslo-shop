export const revalidate = 604800; //cada 7 dias 60*60 *24 * 7


import { getProductBySlug } from '@/actions/products/get-product-by-slug';
import QuantitySelector from '@/components/product/quantitySelector/QuantitySelector';
import SizeSelector from '@/components/product/sizeSelector/SizeSelector';
import ProductMovileSlideshow from '@/components/product/slideshow/ProductMovileSlideshow';
import ProductSlideshow from '@/components/product/slideshow/ProductSlideshow';
import StockLabel from '@/components/product/stock-label/StockLabel';
import { titleFont } from '@/config/fonts';
import { Metadata } from 'next';

import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
   params:Promise<{
     slug:string;
   }>
}


export async function generateMetadata(
  { params}: Props,
  //  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
 
  // fetch post information
  const product = await getProductBySlug(slug)
  return {
    title: product?.title ?? 'No encotrado',
    description: product?.description ?? '',
    openGraph:{
      title: product?.title ?? 'No encotrado',
      description: product?.description ?? '',
      images:[`/products/${product?.images[1]}`]
    }
  }
}

export default async function ProductPage({params}:Props) {

  const {slug} =await params
  const product =await getProductBySlug(slug)

  if(!product){
    notFound()
  }


  return (
    <div className='mt-5 mb-20 grid grid-cols-1  md:grid-cols-3 gap-3'>
      
      {/* slideshow */}
       <div className="col-span-1 md:col-span-2 ">

           {/* Mobile slideshow */}
           <ProductMovileSlideshow
              title={product.title}
             images={product.images}
             className='block md:hidden'
           />
           {/* deskTop */}
          <ProductSlideshow
             title={product.title}
             images={product.images}
             className='hidden md:block'
          
          />
       </div>


      {/* detalles */}

      <div className="col-span-1  px-5 ">
        
        <StockLabel slug={slug}/>

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
            {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
         
         {/* selector de tallas */}
         <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />

         {/* selector de cantidad */}
         <QuantitySelector quantity={2}/>
         
         {/* button */}

         <button className='btn-primary my-5'>
            Agregar al carrito
         </button>


         {/* descripcion */}
          <h3 className="font-bold text-sm ">Descripción</h3>
          <p className="font-light">{product.description}</p>


      </div>



    </div>
  )
}
