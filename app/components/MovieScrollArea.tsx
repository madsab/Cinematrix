"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import MovieCard from "./organisms/MovieCard";
import { ScrollArea, ScrollBar } from "./organisms/ScrollArea";
import cn from "classnames";
import { Separator } from "./atoms/Seperator";
import PopUp from "./organisms/PopUp";
import Stars, { StarsRef } from "./atoms/Stars";
import { Movie } from "../types/Movie";
import { Actor } from "../types/Actor";
import { auth } from "@/firebase/config";
import GenreCard from "./organisms/GenreCard";
import ActorCard from "./organisms/ActorCard";
import { Genre } from "../types/Genre";
import TopMovieBadge from "@/app/components/organisms/TopMovieBadge";
interface MovieScrollAreaProps {
  title?: string | JSX.Element;
  movies?: Movie[];
  actors?: Actor[];
  genres?: Genre[];
  className?: string;
  isTopTen?: boolean;
  userContent?: string[];
}

const MovieScrollArea: FC<MovieScrollAreaProps> = ({
  title,
  movies,
  actors,
  genres,
  className,
  isTopTen,
  userContent,
}) => {
  const ref = useRef<StarsRef>(null);
  const [currentMovie, setCurrentMovie] = useState<Movie>();
  const [showRating, setShowRating] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userContentIDs, setUserContentIDs] = useState<string[]>();
  const [genreIDs, setGenreIDs] = useState<string[]>();
  const [movieIDs, setMovieIDs] = useState<string[]>()
  const [actorIDs, setActorIDs] = useState<string[]>();
  const [directorIDs, setDirectorIDs] = useState<string[]>();

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
      setMovieIDs(data);
    };

    const fetchUserGenres = async () => {
      const res = await fetch(`/api/users/${userId}/genres?type=ID`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setGenreIDs(data);
    };

    const fetchUserActors = async () => {
      const res = await fetch(
        `/api/users/${userId}/actors?type=ID&fieldType=actorsLiked`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setActorIDs(data);
    };

    const fetchUserDirectors = async () => {
      const res = await fetch(
        `/api/users/${userId}/actors?type=ID&fieldType=directorsLiked`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setDirectorIDs(data);
    };

    if (userContent)
      setUserContentIDs(userContent);

    userId && movies && !userContent && !movieIDs && fecthUserWacthedMovies();
    userId && genres && !userContent && !genreIDs && fetchUserGenres();
    userId && actors && !userContent && !actorIDs && fetchUserActors();
    userId && actors && !userContent && !directorIDs && fetchUserDirectors();
  }, [userContent, actors, genres, movies, userId]);

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
          {movies && movies instanceof Array && movies.length != 0 &&
            movies.map((movie, index) => (
              <div className="relative inline-block px-2" key={index}>
                {isTopTen && index < 10 && <TopMovieBadge rank={index + 1} />}
                <MovieCard
                  openRating={openRating(movie)}
                  movie={movie}
                  alreadyWatched={
                    (userContentIDs ? userContentIDs : []).concat(movieIDs ? movieIDs : []).includes(movie.imdbid)
                  }
                />
              </div>
            ))
          }

            {genres &&
              genres instanceof Array &&
              genres.length != 0 &&
              genres.map((genre, index) => (
                <GenreCard
                  key={index}
                  genre={genre}
                  liked={
                    (userContentIDs ? userContentIDs : []).concat(genreIDs ? genreIDs : []).includes(genre.id)
                  }
                />
              ))}

            {actors &&
              actors instanceof Array &&
              actors.length != 0 &&
              actors.map((actor, index) => (
                <ActorCard
                  key={index}
                  actor={actor}
                  liked={
                    (userContentIDs ? userContentIDs : []).concat(actorIDs ? actorIDs : []).concat(directorIDs ? directorIDs : []).includes(actor.id)
                  }
                />
              ))}

            {!(movies && movies instanceof Array && movies.length != 0) &&
              !(genres && genres instanceof Array && genres.length != 0) &&
              !(actors && actors instanceof Array && actors.length != 0) && (
                <div>No results</div>
              )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="absolute top-0 left-0 h-full w-full pointer-events-none "></div>
      </div>
    </div>
  );
};

export default MovieScrollArea;
