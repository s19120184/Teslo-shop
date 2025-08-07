"use client"

import { Product } from "@/src/interfaces/product.interface"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"


interface Props {
    product:Product
}

export default function ProductGridItem({product}:Props) {


    const [displayImage, setDisplayImage ] = useState(product.images[0])
   
    const localSrc = displayImage
    ? displayImage.startsWith("http")
      ? displayImage
      : `/products/${displayImage}`
    : "/imgs/placeholder.jpg";

    
   
  return (
    <div  className="rouded-md overflow-hidden fade-in ">
        <Image 
           src={localSrc}
           alt={product.title}
           className="w-full object-cover rounded"
           width={500}
           height={500}
           onMouseEnter={()=> setDisplayImage(product.images[1])}
           onMouseLeave={()=> setDisplayImage(product.images[0])}
        />
        <div className="p-4 flex flex-col">
            <Link className="hover:text-blue-600" href={`/product/${product.slug}`}>
              {product.title}
            </Link>
            <span className="font-bold">${product.price}</span>
        </div>
    </div>
  )
}
