"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import MovieCard from "./organisms/MovieCard";
import { ScrollArea, ScrollBar } from "./organisms/ScrollArea";
import cn from "classnames";
import { Separator } from "./atoms/Seperator";
import PopUp from "./organisms/PopUp";
import Stars, { StarsRef } from "./atoms/Stars";
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
  const ref = useRef<StarsRef>(null);
  const [currentMovie, setCurrentMovie] = useState<Movie>();
  const [showRating, setShowRating] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userMovieIDs, setUserMoviesIDs] = useState<string[]>();

  const closeRating = () => {
    setShowRating(!showRating);
    ref.current && ref.current.resetRating();
  };
  const openRating = (movie: Movie) => () => {
    setCurrentMovie(movie);
    setShowRating(!showRating);
  };

  const handleConfirm = () => {
    setShowRating(false);
    ref.current && ref.current.saveToDb();
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    const fecthUserWacthedMovies = async () => {
      const res = await fetch(
        `/api/users/${userId}/movies?fieldType=Watched&type=ID`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setUserMoviesIDs(data);
    };
    userId && fecthUserWacthedMovies();
  }, [userId]);

  return (
    <div className="relative">
      <PopUp open={showRating} onCancel={closeRating} onConfirm={handleConfirm}>
        <div className="flex flex-col justify-center items-center">
          <p>{currentMovie?.title}</p>
          <Stars ref={ref} userId={userId} movieImdbId={currentMovie?.imdbid} />
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
            {movies && movies instanceof Array &&
              movies.map((movie, index) => (
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
