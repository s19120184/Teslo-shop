"use server"
import { prisma } from "@/src/lib/prisma"


export const deleteUserAddress =async (userId: string)=>{
    try {

      const deleteAddress = await prisma.userAddress.delete({
        where:{
            userId:userId
        }
      })
    
      if(deleteAddress){
        return {
            ok: true,
            message:'Direccion eliminada'
        }
      }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message:'No se pudo eliminar'
        }
    }
}