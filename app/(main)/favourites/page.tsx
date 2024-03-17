"use client";

import MovieScrollArea from "@/app/components/MovieScrollArea";
import ProfileBanner from "@/app/components/ProfileBanner";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Actor } from "@/app/types/Actor";
import { Genre } from "@/app/types/Genre";
import { Movie } from "@/app/types/Movie";
import { auth } from "@/firebase/config";

// db can be imported from here
import { useEffect, useState } from "react";

const Favourites = () => {
  const [favouriteGenres, setFavouriteGenres] = useState<Genre[]>([]);
  const [likedActors, setlikedActors] = useState<Actor[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [likedMovies, setlikedMovies] = useState<Movie[]>([]);
  const [likedDirectors, setlikedDirectors] = useState<Actor[]>([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        fecthFavouriteGenres();
      }
    });

    const fecthFavouriteGenres = async () => {
      if (userId === null) return;
      const res = await fetch(`/api/users/${userId}/genres?fieldType=genresLiked`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setFavouriteGenres(data);
    };

    fecthFavouriteGenres();

    const fecthlikedActors = async () => {
      if (userId === null) return;
      const res = await fetch(`/api/users/${userId}/actors?fieldType=actorsLiked`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setlikedActors(data);
    };

    fecthlikedActors();
    
    const fetchlikedDirectors = async () => {
      if (userId === null) return;
      const res = await fetch(`/api/users/${userId}/actors?fieldType=directorsLiked`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setlikedDirectors(data);
    };

    fetchlikedDirectors();

    const fetchlikedMovies = async () => {
      if (userId === null) return;
      const res = await fetch(`/api/users/${userId}/movies?fieldType=moviesLiked`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setlikedMovies(data);
    }

    fetchlikedMovies();
    
  }, [userId]);

  const email = auth.currentUser?.email;
  const username = email?.split(/[@.]/)[0];
  const upperUsername = (username || '').charAt(0).toUpperCase() + (username || '').slice(1);

  return (
    <div className="">
      <ProfileBanner username={upperUsername} type={"Favourites"}/>
      <div className="flex space-x-10">
          <div className="w-1/2">
            <MovieScrollArea className="bg-gradient-to-t from-black from-20% via-pink-950 to-black to-80%" title={<span className="flex items-center">Favourite genres &nbsp;<Icon icon="tabler:globe-filled"/> </span>} movies={[]} genres={favouriteGenres} actors={[]}/>
          </div>
          <div className="w-1/2">
            <MovieScrollArea className="bg-gradient-to-t from-black from-20% via-pink-950 to-black to-80%" title={<span className="flex items-center">Favourite actors &nbsp;<Icon icon="tabler:user-heart"/> </span>} movies={[]} genres={[]} actors={likedActors}/>
          </div>
      </div>
      <div className=" flex space-x-10">
        <div className="w-1/2">
          <MovieScrollArea className="bg-gradient-to-t from-black from-20% via-pink-950 to-black to-80%" title={<span className="flex items-center">Favourite movies &nbsp;<Icon icon="tabler:movie"/> </span>} movies={likedMovies} genres={[]} actors={[]}/>
        </div>
        <div className="w-1/2">
          <MovieScrollArea className="bg-gradient-to-t from-black from-20% via-pink-950 to-black to-80%" title={<span className="flex items-center">Favourite directors &nbsp;<Icon icon="game-icons:director-chair"/> </span>} movies={[]} genres={[]} actors={likedDirectors}/>
        </div>
      </div>

    </div>
  );
};
export default Favourites;
