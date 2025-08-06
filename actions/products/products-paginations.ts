"use server"

import { prisma } from "@/src/lib/prisma"
import { Gender } from "@prisma/client";


interface PaginationOptions {
   page?:number;
   take?:number;
   gender?:Gender;
}

export const getPaginatedProductsWithImages =async({page=1 , take=12 ,gender}:PaginationOptions)=>{

    if(isNaN(Number(page))) page =1
    if(page < 1 ) page =1


    try {
        // const produts = await prisma.product.findMany({
        //    take: take,
        //    skip:(page -1) * take,
        //    include:{
        //     ProductImage:{
        //         take:2,
        //         select:{
        //             url: true
        //         }
        //     }
            
        //    }
        // })

       //obtenemos los productos y el total de pages
       const data = await Promise.all([
           prisma.product.findMany({
           take: take,
           skip:(page -1) * take,
           include:{
            ProductImage:{
                take:2,
                select:{
                    url: true,
                    id:true,   
                }
            }
            
           },
           where:{
            gender:gender
           }
        }),
            prisma.product.count({where:{
                gender:gender
            }}),
        ])

        // 2. obtener el total de paginas
        //todo:
        const totalPages = Math.ceil(data[1]/ take)

      
      return {
        curretPage:page,
        totalPages: totalPages,
        products: data[0].map(product =>({
            ...product,
            images : product.ProductImage.map(image => image.url)
        }))
      }
        
    } catch (error) {
       throw new Error("No se pudo cargar los productos"+ error)
    }
}