"use server";

import { prisma } from "@/src/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  cloudinary.config({
    cloud_name: process.env.ClOUD_NAME,
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY
  });

  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      error: "No se puede eliminar imagenes de Fs"
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  try {
    await cloudinary.uploader.destroy(imageName)

    const delitedImage = await prisma.productImage.delete({
        where:{
            id:imageId
        },
        select:{
            product:{
                select:{
                    slug:true
                }
            }
        }
    })

    //revalidate phaths
    revalidatePath(`/admin/products`)
    revalidatePath(`/admin/product/${delitedImage.product.slug}`)
    revalidatePath(`/product/${delitedImage.product.slug}`)

  } catch (error) {
    console.log(error);
  }
};
