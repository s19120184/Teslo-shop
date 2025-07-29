"use server"

import { prisma } from "@/src/lib/prisma"


export const setTransacctionId =async(transactionId: string, orderId:string )=>{

    try {

        const orderTransacction = await prisma.order.update({
            where:{
                id:orderId
            },
            data:{
                transactionId:transactionId
            }
        })

        if(!orderTransacction){
            throw new Error("No se puedo actualizar")
        }


        return {
            ok:true,
            message:'Actualizado correctamente'
        }

        
    } catch (error) {
        console.log(error)
        return{
            ok:false,
            message: 'No se pudo actualizar'
        }        
    }

}