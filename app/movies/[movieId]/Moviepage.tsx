"use client";
import React, { useState, useEffect } from "react";
import Annika from "../../assets/images/Anikka.jpeg";
import { MovieCardProps } from "../../components/organisms/MovieCard";
import MovieButton from "../../components/atoms/Moviebutton";
import Stars from "@/app/components/atoms/Stars";
import PopUp from "@/app/components/organisms/PopUp";
import Button from "@/app/components/atoms/Button";


const dummyMovies: MovieCardProps[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    description:
      "Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
    image: Annika,
    rating: 5,
    actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
  },
];



const MoviePage = ({ params }: { params: { movieId: string } }) => {
  const [movie, setMovie] = useState<MovieCardProps | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const foundMovie = dummyMovies.find(
      (m) => m.id === parseInt(params.movieId)
    );
    setMovie(foundMovie || null);
  }, [params.movieId]);
  const closePopup = ()=> {
    setOpen(false);
  }
  const openPopup =()=> {
    setOpen(true);
  }

  const rateMovie = async (rating) => {
    if (!movie || !movie.id) return;
    try {
      const response = await fetch('/api/movies/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId: movie.id, rating }),
      });
      const data = await response.json();
      if (data.success) {
        // Oppdater eventuelt UI for å vise at ratingen ble oppdatert
        console.log('Rating updated successfully');
      }
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  if (!movie) {
    return <div className="text-white">Movie not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-start bg-gradient-to-r from-black to-[#801336] text-white overflow-hidden shadow-lg p-5 min-h-screen w-full">
      <div className="flex justify-center md:justify-start md:items-center mb-4 md:mb-0">
        {movie.image && (
          <img
            src={movie.image.src}
            alt={movie.title}
            className="rounded-lg max-w-s md:max-w-sm lg:max-w-md mr-8"
          />
        )}
      </div>
      <div className="flex flex-col justify-start p-5">
        <MovieButton/> 
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 border-b border-gray-200 pb-2">
          {movie.title}
        </h1>
        <p className="text-md md:text-lg lg:text-xl mb-4">
          {movie.description}
        </p>
        <p className="mb-2">
          <span className="font-bold">Actors:</span> {movie.actors?.join(", ")}
        </p>
        <p>
          <span className="font-bold">Rating:</span> {movie.rating}/5
        </p>
        <Button onClick={openPopup}> "Rate this movie:"</Button>
        <PopUp open={open} onClose={closePopup}> </PopUp>
        
      </div>
    </div>
  );
};




export default MoviePage;
