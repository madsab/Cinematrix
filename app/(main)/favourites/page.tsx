"use client";
import MovieScrollArea from "@/app/components/MovieScrollArea";
import { Movie } from "@/app/types/Movie";
import { auth } from "@/firebase/config";
// db can be imported from here
import { useEffect, useState } from "react";

const Profile = () => {
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
    <div className=" flex w-full mt-10">
      <div className=" ml-20 w-4/5 space-y-6 grid">
        <MovieScrollArea title="Favourite genres:" movies={moviesWatched} genres={[]} actors={[]}/>
        <MovieScrollArea title="Favourite actors:" movies={moviesRated} genres={[]} actors={[]}/>
        <MovieScrollArea title="Favourite directors:" movies={moviesRated} genres={[]} actors={[]}/>
      </div>
    </div>
  );
};
export default Profile;
