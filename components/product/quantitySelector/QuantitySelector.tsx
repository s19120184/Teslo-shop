"use client"
import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"


interface Props {
    quantity:number
}

export default function QuantitySelector({quantity}:Props) {

    const [count, setCount] =useState(quantity)

      return (
    <div className="flex">
         <button onClick={()=> count > 1 ? setCount(count-1) : setCount(1)}>
             <IoRemoveCircleOutline size={30}/>
         </button>

         <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded ">{count}</span>

          <button onClick={()=> count < 5 ? setCount(count+1) : setCount(5)}>
             <IoAddCircleOutline size={30}/>
         </button>
    </div>
  )
}
