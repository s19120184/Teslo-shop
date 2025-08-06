"use client";

import { createUpdateProduct } from "@/actions/products/createUpdateProduct";
import { deleteProductImage } from "@/actions/products/delete-product-image";
import ProductImage from "@/components/product-image/ProductImage";
import { categories } from "@/src/interfaces/category.interface";
import { Product } from "@/src/interfaces/product.interface";

import clsx from "clsx";
import { useRouter } from "next/navigation";


import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product> ;
  categories: categories[] | undefined;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductFormAdmin({ product, categories }: Props) {
  const router =  useRouter()
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    // formState: { errors }
  } = useForm<Product>({
    defaultValues: {
      ...product,
      tags: product.tags,
      sizes: product.sizes ?? [],
      imagesUp:undefined //para cargar los archivos
    }
  });

  watch("sizes");

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues("sizes"));

    if (sizes.has(size)) {
      sizes.delete(size);
    } else {
      sizes.add(size);
    }
    setValue("sizes", Array.from(sizes));
  };

  const onSubmitHandle = async (data: Product) => {
       const formData = new FormData()
       const {imagesUp, ...productToSave} = data

       if(product.id){
         formData.append('id', productToSave.id ?? '')
       }
       formData.append('title', productToSave.title)
       formData.append('slug', productToSave.slug)
       formData.append('description', productToSave.description)
       formData.append('price', productToSave.price.toString())
       formData.append('inStock', productToSave.inStock.toString())
       formData.append('sizes', productToSave.sizes.toString())
       formData.append('tags', productToSave.tags.toString())
       formData.append('categoryId', productToSave.categoryId !)
       formData.append('gender', productToSave.gender)

       console.log(imagesUp)
       if(imagesUp){
          for (let i = 0; i < imagesUp.length ; i++){
            formData.append('imagesUp', imagesUp[i])
          }
       }


       const {ok , product: producto} = await createUpdateProduct(formData)

       if(!ok){
        alert('Producto no se puedo actualizar')
        return
       }

       router.replace(`/admin/product/${producto?.slug}`)

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandle)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("gender")}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">

        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register('inStock', { required: true, min: 0 })}
          />
        </div>

    

        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                onClick={() => onSizeChange(size)}
                key={size}
                className={clsx(
                  "flex  items-center justify-center w-10 h-10 mr-2 border rounded-md cursor-pointer",
                  {
                    "bg-blue-500 text-white": getValues("sizes").includes(size)
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            {/* cargar imagenes */}
            <input
              type="file"
              {...register('imagesUp')}
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
              {product.ProductImage?.map((img) => (
                <div key={img.id}>
                  <ProductImage
                    src={img.url}
                    width={200}
                    height={200}
                    alt={img.url}
                    className="rounded-t shadow-md"
                    
                  />
                  {/* eliminar la imagen */}
                  <button
                    type="button"
                    onClick={() => deleteProductImage(img.id, img.url)}
                    className="w-full rounded-b-xl bg-red-600 p-2 text-white uppercase font-bold hover:bg-red-500"
                  >
                    eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
