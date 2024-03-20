"use client";
import React, { useState, useEffect, useRef } from "react";
import MovieButton from "../../../components/atoms/Moviebutton";
import { Movie } from "../../../types/Movie";
import { auth } from "@/firebase/config";
import { redirect } from "next/navigation";
import Stars, { StarsRef } from "@/app/components/atoms/Stars";
import Button from "@/app/components/atoms/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import cn from "classnames";
import { Actor } from "@/app/types/Actor";
import MovieScrollArea from "@/app/components/MovieScrollArea";
import { Genre } from "@/app/types/Genre";


const MoviePage = ({ params }: { params: { movieId: string } }) => {
  const ref = useRef<StarsRef>(null);
  const [movie, setMovie] = useState<Movie>();
  const [open, setOpen] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [userMoviesIDs, setUserMoviesIDs] = useState<string[]>();
  const [directors, setDirectors] = useState<Actor[]>();
  const [actors, setActors] = useState<Actor[]>();
  const [genres, setGenres] = useState<Genre[]>();


  const [isLiked, setLiked] = useState(false);

  const heart = isLiked ? "tabler:heart" : "tabler:heart-off";

  const markAsLiked = () => {
    let method = !isLiked ? "POST" : "DELETE";
    userId && saveLikeToDb(method);
    setLiked(!isLiked);
  };

  const saveLikeToDb = async (method: string) => {
    await fetch(`/api/users/${userId}/movies?fieldType=Liked`, {
      method: method,
      body: JSON.stringify({ movieImdbId: params.movieId }),
    });
  };


  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/getMovieByID?id=" + params.movieId, {
        method: "GET",
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
      setUserMoviesIDs(data);
    };

    const checkIfMovieLiked = async () => {
      const res = await fetch(
        `/api/users/${userId}/movies?fieldType=Liked&type=ID`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json() as String[];
      setLiked(data.includes(params.movieId));
    }

    const fetchDirectors = async () => {
      const res = await fetch(`/api/actorsByMovie?fieldType=Directed&movieID=` + params.movieId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setDirectors(data);
    };

    const fetchActors = async () => {
      const res = await fetch(`/api/actorsByMovie?fieldType=ActedIn&movieID=` + params.movieId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setActors(data);
    };

    const fetchGenres = async () => {
      const res = await fetch(`/api/genresByMovie?movieID=` + params.movieId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setGenres(data);
    };
    

    userId && fetchUserWacthedMovies();
    userId && checkIfMovieLiked();
    userId && !directors && fetchDirectors();
    userId && !actors && fetchActors();
    userId && !genres && fetchGenres();
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
                <div className="flex items-center w-full justify-center space-x-2 mb-6 border-b border-gray-200 pb-2">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                    {movie?.title}
                  </h1>
                  <Icon
                  icon={heart}
                  width={60}
                  height={60}
                  onClick={() => userId && markAsLiked()}
                  className={cn(
                    "hover:cursor-pointer ease-linear duration-100 rounded-md",
                    isLiked ? "bg-white text-black" : "text-white")}
                  />
                </div>
                <p className="text-md md:text-lg lg:text-xl mb-8 ">
                  {movie?.description}
                </p>
                <div className="space-y-3">
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
              <div className="flex space-x-10 flex-wrap justify-center">
              {
                directors && directors.length > 0 ? (
                  <div className="">
                    <MovieScrollArea title={"Directors"} movies={[]} actors={directors} genres={[]}/>
                  </div>
                ) : (
                 <></> 
                )
              }
              {
                actors && actors.length > 0 ? (
                  <div className="">
                    <MovieScrollArea title={"Actors"} movies={[]} actors={actors} genres={[]}/>
                  </div>
                ) : (
                 <></> 
                )
              }
              {
                genres && genres.length > 0 ? (
                  <div className="">
                    <MovieScrollArea title={"Genres"} movies={[]} actors={[]} genres={genres}/>
                  </div>
                ) : (
                 <></> 
                )
              }

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MoviePage;
