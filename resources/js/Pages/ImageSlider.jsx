import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

import React from "react";

import banner1 from '../../../public/images/imgbanner1.webp'

  
  export default function ImageSlider() {
    return (
      <Carousel       
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}>
        <CarouselContent className=''>
          <CarouselItem className='flex justify-center '>
            <img src={banner1} className="w-auto h-70 rounded rounded-xl" alt="Image 3" />
          </CarouselItem >
          <CarouselItem className='flex justify-center '>
            <img src={banner1} className="w-auto h-70 rounded rounded-xl" alt="Image 3" />
          </CarouselItem >
          <CarouselItem className='flex justify-center '>
            <img src={banner1} className="w-auto h-70 rounded rounded-xl" alt="Image 3" />
          </CarouselItem >
          <CarouselItem className='flex justify-center '>
            <img src={banner1} className="w-auto h-70 rounded rounded-xl" alt="Image 3" />
          </CarouselItem >
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext />
      </Carousel>
    );
  }
  