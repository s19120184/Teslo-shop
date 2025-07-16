"use client"

import QuantitySelector from '@/components/product/quantitySelector/QuantitySelector'
import SizeSelector from '@/components/product/sizeSelector/SizeSelector'
import { CartProduct, Product, Size } from '@/src/interfaces/product.interface'
import { useCartStore } from '@/src/store/cart/cart-store'
import React, { useState } from 'react'

interface Props {
    product:Product
}

export default function AddToCart({product}:Props) {

    const addProductToCart = useCartStore(state => state.addProductToCart)

   const [ size , setSize ] = useState<Size | undefined>()
   const [ quantity, setQuantity] = useState<number>(1)
   const [posted, setPosted] = useState(false)

   const addToCart =()=>{
        setPosted(true)
        if(!size) return 
        
        const cartProdut: CartProduct ={
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0]
        }

        addProductToCart(cartProdut)

        setPosted(false)
        setQuantity(1)
        setSize(undefined)


   }

  return (
    <>  
        {posted && !size &&(
            <span className='text-red-500 font-bold uppercase fade-in'>Debe de seleccionar una Talla*</span>
        )}
    
       {/* selector de tallas */}
         <SizeSelector 
            selectedSize={size} 
            availableSizes={product.sizes} 
            // (size) => setSize(size) 
            onSizeChange={setSize} /> 

         {/* selector de cantidad */}
         <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity}/>
         
         {/* button */}

         <button 
            onClick={addToCart}
           className='btn-primary my-5'>
            Agregar al carrito
         </button></>
  )
}
