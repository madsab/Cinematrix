"use client";
import MovieScrollArea from "@/app/components/MovieScrollArea";
import { Actor } from "@/app/types/Actor";
import { Genre } from "@/app/types/Genre";
import { Movie } from "@/app/types/Movie";
import { auth } from "@/firebase/config";
// db can be imported from here
import { useEffect, useState } from "react";

const Favourites = () => {
  const [moviesWatched, setMoviesWatched] = useState<Genre[]>([]);
  const [moviesRated, setMoviesRated] = useState<Actor[]>([]);
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
      const res = await fetch(`/api/users/${userId}/genres`, {
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
      const res = await fetch(`/api/users/${userId}/actors?fieldType=actorsLiked`, {
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
          <MovieScrollArea title="Favourite genres:" movies={[]} genres={moviesWatched} actors={[]}/>
        </div>
        <div className="w-2/5 ">
          <MovieScrollArea title="Favourite actors:" movies={[]} genres={[]} actors={moviesRated}/>
        </div>
      </div>
      </div>
      <MovieScrollArea title="Favourite actors:" movies={moviesRated} genres={[]} actors={[]}/>

    </div>
  );
};
export default Favourites;
