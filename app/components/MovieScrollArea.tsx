"use client";
import React, { FC } from "react";
import MovieCard, { MovieCardProps } from "./organisms/MovieCard";
import { ScrollArea, ScrollBar } from "./organisms/ScrollArea";
import cn from "classnames";
import { Separator } from "./atoms/Seperator";
import PopUp from "./organisms/PopUp";
interface MovieScrollAreaProps {
  title?: string;
  movies: MovieCardProps[];
  className?: string;
}

const MovieScrollArea: FC<MovieScrollAreaProps> = ({
  title,
  movies,
  className,
}) => {
  const [showPopup, setShowPopup] = React.useState(true);
  const [currentMovie, setCurrentMovie] = React.useState<MovieCardProps>();
  const openRating = (movie: MovieCardProps) => () => {
    setShowPopup(!showPopup);
    setCurrentMovie(movie);
  };
  return (
    <div>
      {showPopup && (
        <PopUp className="left-1/4 top-1/4">
          <div>
            <p>{currentMovie?.title}</p>
          </div>
        </PopUp>
      )}
      {title && (
        <div>
          <h2 className=" mx-4 text-2xl font-bold mb-4">{title}</h2>
          <Separator className=" bg-white " />
        </div>
      )}
      <div className="relative">
        <ScrollArea className={cn("whitespace-nowrap rounded-md", className)}>
          <div className="flex w-max space-x-8 p-4 z-0">
            {movies.map((movie, index) => (
              <MovieCard
                openRating={openRating(movie)}
                key={index}
                {...movie}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="absolute top-0 left-0 h-full w-full shadow-inner-x pointer-events-none "></div>
      </div>
    </div>
  );
};

export default MovieScrollArea;
