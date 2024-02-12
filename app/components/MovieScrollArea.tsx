"use client";
import React, { FC } from "react";
import MovieCard, { MovieCardProps } from "./organisms/MovieCard";
import { ScrollArea, ScrollBar } from "./organisms/ScrollArea";

interface MovieScrollAreaProps {
  movies: MovieCardProps[];
}

const MovieScrollArea: FC<MovieScrollAreaProps> = ({ movies }) => {
  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {movies.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default MovieScrollArea;
