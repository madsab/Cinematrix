"use client";
import React, { ChangeEvent, FC, useEffect, useRef } from "react";
import MovieCard, { MovieCardProps } from "./organisms/MovieCard";
import { ScrollArea, ScrollBar } from "./organisms/ScrollArea";
import cn from "classnames";
import { Separator } from "./atoms/Seperator";
import PopUp from "./organisms/PopUp";
import Stars from "./atoms/Stars";
import { Movie } from "../types/Movie";
import { auth } from "@/firebase/config";
interface MovieScrollAreaProps {
  title?: string;
  movies: Movie[];
  className?: string;
}

const MovieScrollArea: FC<MovieScrollAreaProps> = ({
  title,
  movies,
  className,
}) => {
  const [currentMovie, setCurrentMovie] = React.useState<Movie>();
  const [showRating, setShowRating] = React.useState(false);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [userMovieIDs, setUserMoviesIDs] = React.useState<string[]>();

  const closeRating = () => {
    setShowRating(!showRating);
  };
  const openRating = (movie: Movie) => () => {
    setCurrentMovie(movie);
    setShowRating(!showRating);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    const fecthUserWacthedMovies = async () => {
      const res = await fetch(`/api/users/${userId}/movies?type=id`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUserMoviesIDs(data);
    };
    fecthUserWacthedMovies();
  }, [userId]);

  return (
    <div className="relative">
      <PopUp open={showRating} onClose={closeRating}>
        <div className="flex flex-col justify-center items-center">
          <p>{currentMovie?.title}</p>
          <Stars />
        </div>
      </PopUp>
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
                movie={movie}
                alreadyWatched={
                  userMovieIDs ? userMovieIDs?.includes(movie.imdbid) : false
                }
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
