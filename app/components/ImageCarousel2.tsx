"use client";
import React from "react";
import Image from "@/node_modules/next/image"
import { useEffect, useState } from 'react';

interface CarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change the interval as needed (e.g., 3000 for 3 seconds)

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className=" overflow-hidden h-screen w-screen">
      {images.map((image, index) => (
        <div
            key={index}
            className={`h-2/3 w-full absolute inset-0 transition-opacity ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <img src={image} alt={`Slide ${index + 1}`} className="h-full w-full " />
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;
