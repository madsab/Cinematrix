"use client";
import MovieScrollArea from "@/app/components/MovieScrollArea";
import { Movie } from "@/app/types/Movie";
import { auth } from "@/firebase/config";
// db can be imported from here
import { useEffect, useState } from "react";

const Favourites = () => {
  const [moviesWatched, setMoviesWatched] = useState<Movie[]>([]);
  const [moviesRated, setMoviesRated] = useState<Movie[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        fecthUserWacthedMovies();
      }
    });

    const fecthUserWacthedMovies = async () => {
      if (userId === null) return;
      const res = await fetch(`/api/users/${userId}/movies?fieldType=Watched`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setMoviesWatched(data);
    };

    const fecthUserRatedMovies = async () => {
      if (userId === null) return;
      const res = await fetch(`/api/users/${userId}/movies?fieldType=Rated`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setMoviesRated(data);
    };

    fecthUserRatedMovies();
  }, [userId]);
  return (
    <div className=" mt-10">
      <div className=" flex justify-center">
      <div className=" w-4/5 flex justify-around">
        <div className="w-2/5">
          <MovieScrollArea title="Favourite genres:" movies={moviesWatched} genres={[]} actors={[]}/>
        </div>
        <div className="w-2/5 ">
          <MovieScrollArea title="Favourite actors:" movies={moviesRated} genres={[]} actors={[]}/>
        </div>
      </div>
      </div>
      <MovieScrollArea title="Favourite actors:" movies={moviesRated} genres={[]} actors={[]}/>

    </div>
  );
};
export default Favourites;
