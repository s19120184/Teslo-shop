"use server";

import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/src/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { z } from "zod";


const productSchema = z.object({
  id: z.string().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  categoryId: z.string(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.enum(Gender)
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  console.log(productParsed.success);
  if (!productParsed.success) {
    console.log(productParsed.error);
    return {
      ok: false
    };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLocaleLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        //actualizar
        product = await tx.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        });

        console.log({ updated: product });
      } else {
        //crear
        product = await tx.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        });
      }

      //proceso de carga y guardado de imagenes
      //recorrer las imagenes y guardarlas
      if (formData.getAll("imagesUp")) {
        const images = await uploadImages(formData.getAll("imagesUp") as File[]);
         if(!images){
            throw new Error('No se puedo cargar las Imagenes')
         }

         //actualizar las imagenes
         await prisma.productImage.createMany({
            data:images.map(image=>({
                url: image!,
                productId: product.id
            }))
         });

      }

      return {
        product
      };
    });

    //todo:revalidate paths
    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false
    };
  }
};

const uploadImages = async (images: File[]) => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.ClOUD_NAME,
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY
  });

  try {

    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((response) => response.secure_url);
      } catch (error) {
        console.log(error)
        return null
      }
    });

    const updatedImages = await Promise.all(uploadPromises)
    return updatedImages

  } catch (error) {
    console.log(error);
    return null;
  }

  
};
