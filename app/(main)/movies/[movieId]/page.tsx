"use client";
import React, { useState, useEffect, useRef } from "react";
import MovieButton from "../../../components/atoms/Moviebutton";
import { Movie } from "../../../types/Movie";
import { auth } from "@/firebase/config";
import { redirect } from "next/navigation";
import Stars, { StarsRef } from "@/app/components/atoms/Stars";
import Button from "@/app/components/atoms/Button";

const MoviePage = ({ params }: { params: { movieId: string } }) => {
  const ref = useRef<StarsRef>(null);
  const [movie, setMovie] = useState<Movie>();
  const [open, setOpen] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [userMoviesIDs, setUserMoviesIDs] = useState<string[]>();

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/getMovieByID?id=" + params.movieId, {
        method: "GET",
        cache: "force-cache",
      });
      const data = await res.json();
      setMovie(data);
    };
    if (notLoggedIn) {
      redirect("/signin");
    } else {
      fetchMovies();
    }
  }, [notLoggedIn]);

  useEffect(() => {
    const fetchUserWacthedMovies = async () => {
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
      console.log(data);
      setUserMoviesIDs(data);
    };
    userId && fetchUserWacthedMovies();
  }, [userId]);

  auth.onAuthStateChanged((user) => {
    setLoading(false);

    if (user) {
      setNotLoggedIn(false);
      setUserId(user.uid);
    } else {
      setNotLoggedIn(true);
    }
  });

  const saveToDb = () => {
    ref.current && ref.current.saveToDb();
    setShowButton(false);
    saveWatchedToDb();
  };

  const handleClick = () => {
    setShowButton(true);
  };

  const saveWatchedToDb = async () => {
    if (movie) {
      let method = userMoviesIDs?.includes(movie?.imdbid) ? "DELETE" : "POST";
      await fetch(`/api/users/${userId}/movies?fieldType=Watched`, {
        method: method,
        body: JSON.stringify({ movieImdbId: movie?.imdbid }),
      });
    }
  };

  return (
    <>
      {movie == null ? (
        <div>Loading</div>
      ) : (
        <div>
          <div className="bg-gradient-to-r from-black to-[#801336] text-white overflow-hidden shadow-lg p-5 min-h-screen w-full space-y-8">
            <div className="flex flex-col md:flex-row justify-center items-start">
              <div className="flex justify-center md:justify-start md:items-center mb-4 md:mb-0">
                {movie && (
                  <img
                    src={movie.big_image}
                    alt={movie.title}
                    className="rounded-lg max-w-s md:max-w-sm lg:max-w-md mr-8"
                  />
                )}
              </div>
              <div className="flex flex-col justify-start p-5 ">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 border-b border-gray-200 pb-2">
                  {movie?.title}
                </h1>
                <p className="text-md md:text-lg lg:text-xl mb-8 ">
                  {movie?.description}
                </p>
                <div className="space-y-3">
                  <p className="mb-2">
                    <span className="font-bold">Genres:</span>{" "}
                    {movie?.genre?.join(", ")}
                  </p>
                  <p>
                    <span className="font-bold"> Director: </span>
                  </p>
                  <p>
                    <span className="font-bold"> Actors: </span>
                  </p>
                  <p>
                    <span className="font-bold"> Release year: </span>{" "}
                    {movie?.year}
                  </p>
                  <p>
                    <span className="font-bold">Rating:</span> {movie?.rating}
                    /10
                  </p>
                </div>
                <div className="mt-8 space-y-2">
                  <p>
                    <span className="font-bold"> Your rating: </span>
                  </p>
                  <Stars
                    onClick={handleClick}
                    movieImdbId={movie.imdbid}
                    userId={userId}
                    ref={ref}
                  />
                  <div>
                    <MovieButton
                      onClick={handleClick}
                      alreadyWatched={
                        movie && userMoviesIDs?.includes(movie.imdbid)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {showButton && (
              <div className=" flex justify-center">
                <Button
                  className=" px-6 hover:bg-purple-800"
                  onClick={saveToDb}
                >
                  Confirm
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MoviePage;
