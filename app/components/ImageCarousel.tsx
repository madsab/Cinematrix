"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { Sponsored } from "../types/Sponsored";
import { useRouter } from "next/navigation";

interface CarouselProps {
  images: Sponsored[];
}

const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change the interval as needed (e.g., 3000 for 3 seconds)

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className=" overflow-hidden h-screen w-full flex justify-center">
      {images.map((image, index) => (
        <div
            key={index}
            className={`h-2/3 w-full absolute inset-0 transition-opacity flex justify-center ${
                index === currentIndex && 'hidden'
            }`}
        >
          <img src={image.poster} alt={`Slide ${index + 1}`} className="h-full w-full object-cover md:object-scale-up" 
            onClick={() => router.push(`/movies/${image.movieId}`)}
            />
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;
