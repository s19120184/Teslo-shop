import QuantitySelector from '@/components/product/quantitySelector/QuantitySelector';
import SizeSelector from '@/components/product/sizeSelector/SizeSelector';
import ProductMovileSlideshow from '@/components/product/slideshow/ProductMovileSlideshow';
import ProductSlideshow from '@/components/product/slideshow/ProductSlideshow';
import { titleFont } from '@/config/fonts';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
   params:{
     slug:string;
   }
}

export default function ProductPage({params}:Props) {

  const {slug} = params
  const product = initialData.products.find(product=> product.slug === slug)

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
