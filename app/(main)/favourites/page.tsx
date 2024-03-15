"use client";
import Image from "@/node_modules/next/image"
import MovieScrollArea from "@/app/components/MovieScrollArea";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Actor } from "@/app/types/Actor";
import { Genre } from "@/app/types/Genre";
import { Movie } from "@/app/types/Movie";
import { auth } from "@/firebase/config";
import Avatar from "../../assets/images/avatar.png";
import Poster from "../../assets/images/profile_banner.jpg";
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

  const numFavouriteGenres = favouriteGenres.length;
  const numLikedActors = likedActors.length;
  const numLikedMovies = likedMovies.length;
  const numLikedDirectors = likedDirectors.length;

  return (
    <div className="">
      <div className="relative container mx-auto mt-3 flex justify-content z-0 h-[20rem] w-full ">
        <Image src={Poster} alt="Profile Poster" className="h-full w-full object-cover " />
      </div>
      
      

      <div className="-mt-[1%] backdrop-blur-[1px] min-h-40 flex items-center justify-center ">
        <Image src={Avatar} width={90} height={90} alt={"Avatar"}/>
        <p className="flex ml-10">{upperUsername ? `${upperUsername}'s favourites` : 'Favourites'}</p>
      </div>
      
      <div className="flex space-x-10">
          <div className="w-1/2">
            <MovieScrollArea className="bg-gradient-to-t from-black via-pink-950 to-black" title={<span className="flex items-center">Favourite genres &nbsp;<Icon icon="tabler:globe-filled"/> </span>} movies={[]} genres={favouriteGenres} actors={[]}/>
          </div>
          <div className="w-1/2">
            <MovieScrollArea className="bg-gradient-to-t from-black via-pink-950 to-black" title={<span className="flex items-center">Favourite actors &nbsp;<Icon icon="tabler:user-heart"/> </span>} movies={[]} genres={[]} actors={likedActors}/>
          </div>
      </div>
      <div className=" flex space-x-10">
        <div className="w-1/2">
          <MovieScrollArea className="bg-gradient-to-t from-black via-pink-950 to-black" title={<span className="flex items-center">Favourite movies &nbsp;<Icon icon="tabler:movie"/> </span>} movies={likedMovies} genres={[]} actors={[]}/>
        </div>
        <div className="w-1/2">
          <MovieScrollArea className="bg-gradient-to-t from-black via-pink-950 to-black" title={<span className="flex items-center">Favourite directors &nbsp;<Icon icon="game-icons:director-chair"/> </span>} movies={[]} genres={[]} actors={likedDirectors}/>
        </div>
      </div>

    </div>
  );
};
export default Favourites;
