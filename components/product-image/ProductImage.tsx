"use client";


import Image from "next/image";


interface Props {
  src?: string;
  alt?: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  width: number;
  height: number;
  // efecto de imagen

 
}

export default function ProductImage({
  src,
  alt = "Imagen teslo",
  className,
  width,
  height,
  style,
  
}: Props) {
  
  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}

      //   "w-20 h-20 object-cover rounded"
    />
  );
}
