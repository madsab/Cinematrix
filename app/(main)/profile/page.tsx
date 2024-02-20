"use client";
import MovieScrollArea from "@/app/components/MovieScrollArea";
import Annika from "../assets/images/Anikka.jpeg";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import { Movie } from "@/app/types/Movie";

const Profile = () => {
  const [moviesWatched, setMoviesWatched] = useState<Movie[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    const fecthUserWacthedMovies = async () => {
      const res = await fetch(`/api/users/${userId}/movies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setMoviesWatched(data);
    };
    fecthUserWacthedMovies();
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
