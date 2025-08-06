"use client";

// Import Swiper React components

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './slideshow.css'

import { Autoplay, FreeMode, Pagination, Thumbs } from 'swiper/modules';

import ProductImage from "@/components/product-image/ProductImage";


interface Props {
  images: string[];
  title: string;
  className?: string;
}

export default function ProductMovileSlideshow({ images, title, className }: Props) {

  return (
    <div className={className}>
       <Swiper
       style={{
          width:'100vw',
          height:'500px'
       }}
        pagination
        autoplay={{
            //Cambia de slide cada 2.5s
            delay:2500 
        }}
        modules={[FreeMode ,Thumbs, Autoplay, Pagination]}
        className="mySwiper2"
      >
            {
                images.map(image=>(
                  <SwiperSlide key={image}>
                      <ProductImage
                        width={600}
                        height={500} 
                        src={image}
                        alt={title}
                        className='object-fill'
                        />
                  </SwiperSlide> 
                ))
             }
        
        
      </Swiper>

    </div>
  );
}
