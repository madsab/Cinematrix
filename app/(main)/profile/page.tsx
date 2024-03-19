"use client";
import MovieScrollArea from "@/app/components/MovieScrollArea";
import ProfileBanner from "@/app/components/ProfileBanner";
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

  const email = auth.currentUser?.email;
  const username = email?.split(/[@.]/)[0];
  const upperUsername =
    (username || "").charAt(0).toUpperCase() + (username || "").slice(1);

  return (
    <div className=" flex w-full flex-wrap">
      <ProfileBanner username={upperUsername} type={"Watchlist"} />
      <div className=" ml-20 w-4/5 space-y-6">
        <MovieScrollArea title="Movies you've seen:" movies={moviesWatched} />
        <MovieScrollArea title="Movies you've rated:" movies={moviesRated} />
      </div>
    </div>
  );
};
export default Profile;
