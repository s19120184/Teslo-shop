import ProductGrid from "@/components/products/productGrid/ProductGrid";
import Tittle from "@/components/ui/title/Tittle";
import { initialData } from "@/seed/seed";


const products = initialData.products


export default function Home() {
  return (
       <>
        <Tittle  title="Tienda" subtitle="Todos los productos" className="mb-2"/>
          <ProductGrid products={products}/>
       </>
  );
}
