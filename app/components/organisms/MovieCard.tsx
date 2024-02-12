import Image, { StaticImageData } from "next/image";
import React, { FC } from "react";

export interface MovieCardProps {
  title: string;
  description: string;
  image: StaticImageData;
  rating: number;
}

const MovieCard: FC<MovieCardProps> = ({ ...props }) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={props.image}
        alt={props.title}
        className=" rounded-md"
        width={150}
        height={150}
      />
      <p>{props.title}</p>
    </div>
  );
};

export default MovieCard;
