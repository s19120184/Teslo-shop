"use client"

import { CartProduct } from "@/src/interfaces/product.interface"


import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"


interface Props {
    quantity:number
    onQuantityChanged:(quantity:number, product?:CartProduct)=> void
}

export default function QuantitySelector({quantity , onQuantityChanged }:Props) {

    //const [count, setCount] =useState(quantity)

      return (
    <div className="flex">
         <button onClick={()=> quantity > 1 ? onQuantityChanged(quantity-1) : onQuantityChanged(1 )}>
             <IoRemoveCircleOutline size={30}/>
         </button>

         <span  className="w-20 mx-3 px-5 bg-gray-200 text-center rounded ">{quantity}</span>

          <button onClick={()=> quantity < 5 ? onQuantityChanged(quantity+1 ) : onQuantityChanged(5)}>
             <IoAddCircleOutline size={30}/>
         </button>
    </div>
  )
}
