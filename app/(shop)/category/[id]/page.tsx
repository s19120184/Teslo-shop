import ProductGrid from "@/components/products/productGrid/ProductGrid"
import Tittle from "@/components/ui/title/Tittle"
import { initialData } from "@/seed/seed"
// import { Category } from "@/src/interfaces/product.interface"
import { notFound } from "next/navigation"


interface Props {
  params:{
    id:string
  }
}

// interface Props {
//   params:{
//     id: Category
//   }
// }



const products = initialData.products

export default async function CategoryPage({params}:Props) {

  const {id}= await params

  // const labels:Record<Category, string> ={
  //    'men':'para hombres',
  //    'women': 'para mujeres',
  //    'kid': 'para niños',
  //     'unisex': 'para todos'
  // }

  const category = id === 'men' && 'Para Hombre'  || id === 'women' && 'Para Mujer' || id === 'kid' && 'Para Niños' 
 
  if(!category){
    notFound()
  }

  const productByCategory= products.filter(product => product.gender === id)

  return (
    <div>
        <Tittle title={`${category} `}/>
        <ProductGrid  products={productByCategory}/>
    </div>
  )
}
