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
      console.log(data);
      setMoviesWatched(data);
    };

    const fecthUserRatedMovies = async () => {
      if (userId === null) return;
      const res = await fetch(
        `/api/users/${userId}/movies?fieldType=Rated&type=ID`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      // setMoviesRated(data);
    };

    fecthUserRatedMovies();
  }, [userId]);
  return (
    <div className=" flex w-full mt-10">
      {/* If filter is wanted on the profile page, this can be used for that component
            <div className=" mt-10 w-1/5">
                <h3 className=" text-center">Filter</h3>
            </div>
            */}
      <div className=" ml-20 w-4/5 space-y-6">
        {/* <MovieScrollArea title="Your ratings:" movies={[]} /> */}
        <MovieScrollArea title="Movies you've seen:" movies={moviesWatched} />
      </div>
    </div>
  );
};
export default Profile;
