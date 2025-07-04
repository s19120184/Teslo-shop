

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main(){
    try {
        //agregamos todas la categorias y los productos
        Promise.all([
            await prisma.productImage.deleteMany(),
            await prisma.product.deleteMany(),
            await prisma.category.deleteMany()
       ])

       console.log("data reiniciada")
    } catch (error) {
        console.log(error)
    }
}

main()
   .then(async () => {
    await prisma.$disconnect()
    
   })
   .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1) //siempre que hay error utilizamos
   });