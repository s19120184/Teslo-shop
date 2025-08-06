'use server'


import { prisma } from "@/src/lib/prisma"


export const getCategories = async ()=>{

    try {

        const categories = await prisma.category.findMany()
        
        if(!categories){
            return{
                ok:false
            }
        }

        return {
            ok:true,
            categories: categories
        }
        
    } catch (error) {
        console.log(error)
        return{
                ok:false,
                message:'No se pudieron obtener las categorias'
            }
    }
}