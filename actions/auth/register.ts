"use server"

import { prisma } from "@/src/lib/prisma"
import bcrypt from "bcryptjs"

export const registerUser =async (name:string, email:string, password:string)=>{
    try {

        const userExists = await prisma.user.findUnique({
            where:{ email: email}     
        })

        if(userExists){
            return{
                ok:false,
                message:"El correo ya existe"
            }
        }

        const user = await prisma.user.create({
            data:{
                name:name,
                email:email.toLowerCase(),
                password: bcrypt.hashSync(password)
            },
            select:{
                id:true, 
                name:true,
                email:true
            }
        })

        return {
            ok:true, 
            user:user
        }
        
    } catch (error) {
        console.log(error)
        return{
            ok: false,
            message:"No se pudo crear el usuario"
        }
    }

}