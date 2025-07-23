"use server"

import { Address } from "@/src/interfaces/address.interface"
import { prisma } from "@/src/lib/prisma"


export const setUserAddress = async(address:Address , userId: string)  =>{

       
    try {
        const newAddress = await creaateOrReplaceAddress(address, userId)

        return {
            ok: true,
            address : newAddress
        }
        
    } catch (error) {
        console.log(error)
        return{
            ok:false,
            message:'No se pudo grabar la direccion'
        }
    }
}

const creaateOrReplaceAddress = async (address:Address , userId: string)=>{
    try {

        const storedAdreess = await prisma.userAddress.findUnique({
            where:{userId}
        })

        // const {rememberAddress , ...rest} = address

        const adressToSave ={
            userId: userId,
            address: address.address,
            address2: address.address2,
            countryId: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            city: address.city,
            phone: address.phone,
            postalCode: address.postalCode
        }

        if(!storedAdreess){
            const newAddress = await prisma.userAddress.create({
                data: adressToSave
            })

            return newAddress
        }

        const updatedAddress = await prisma.userAddress.update({
            where:{userId},
            data:adressToSave
        })

        return updatedAddress

        
    } catch (error) {
        console.log(error)
        throw new Error("No se pudo grabar la direccion")
    }
}