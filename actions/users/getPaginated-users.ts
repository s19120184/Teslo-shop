"use server"

import { auth } from '@/src/auth.config'
import { prisma } from '@/src/lib/prisma'


export const gePaginatedUser  = async () => {
    
    const session = await auth()

    if(session?.user.role !== 'admin' ){
        return{
            ok:false,
            message:'Debe de ser un usuario administrador'
        }
    }

    const users = await prisma.user.findMany({
        orderBy:{
            name:'desc'
        }
    })

    return{
        ok:true,
        users:users
    }


}