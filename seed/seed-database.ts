import { prisma } from "../src/lib/prisma"
import { initialData } from "./seed"
import { countries } from "./seed-countries"

async function main() {

    //1. borrar registros previos
    await Promise.all([
        
        await prisma.orderAddress.deleteMany(),
        await prisma.orderItem.deleteMany(),
        await prisma.order.deleteMany(),
        
        
        // await prisma.country.deleteMany(),
        await prisma.userAddress.deleteMany(),
        await prisma.user.deleteMany(),
        await prisma.productImage.deleteMany(),
        await prisma.product.deleteMany(),
        await prisma.category.deleteMany(),

    ])
   
    const {categories , products , users} =initialData

    //crear paises
    await prisma.country.createMany({
        data:countries
    })

    //nuevo crear users
    await prisma.user.createMany({
        data:users
    })

    const categoriesData = categories.map(category =>({
        name:category
    }))
    
    //inscertar categorias
    await prisma.category.createMany({
        data:categoriesData
    })
    

    //tomar las categorias en la base de datos
    const categoriesDb = await prisma.category.findMany()
     

    //creamos un mapa con la informacion de categorias llave el nombre y valor el id
    const categoriesMap = categoriesDb.reduce((map, category)=>{
       
        map[category.name.toLowerCase()] = category.id

        return map
    } ,{} as Record<string, string> ) // <string = shirt , string= categoryId >


    // Insertar Productos

    products.forEach( async (product) =>{
        const {type, images, ...rest} =product

        const dbProduct = await prisma.product.create({
            data:{
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        // Insertar Imagenenes

        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }))

        await prisma.productImage.createMany({
            data : imagesData
        })

    })

    console.log('Ejecutado correctamente')
}
(()=>{
       main()
})()