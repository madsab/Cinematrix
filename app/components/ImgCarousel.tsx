"use client";
import React, { FC, useEffect, useRef, useState } from "react";

import { Carousel } from "flowbite-react";
import { useRouter } from "next/navigation";
import { Sponsored } from "../types/Sponsored";

const ImgCarousel = () => {
  const router = useRouter();

  const [sponsors, setSponsors] = useState<Sponsored[]>([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      const res = await fetch("/api/sponsored", {
        method: "GET",
      });
      const data = await res.json();
      setSponsors(data);
    };
    fetchSponsors();
  }, []);

  return (
    <div className="relative container mx-auto mt-3 flex justify-content z-0 h-[35rem] w-full ">
      <Carousel className="h-full" slideInterval={5000} leftControl=" " rightControl=" ">
        {sponsors.map((image, index) => (
          <div key={index}>
            <img
              src={image.poster}
              alt={"Slide ${index + 1}"}
              className="h-full w-full object-cover md:object-scale-up hover:scale-105 transition-transform"
              onClick={() => router.push(`/movies/${image.movieId}`)}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImgCarousel;
