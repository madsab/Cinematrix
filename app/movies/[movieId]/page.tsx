"use client";
import React, { useState, useEffect } from "react";
import Annika from "../../assets/images/Anikka.jpeg";
import { MovieCardProps } from "../../components/organisms/MovieCard";
import "./page.css";

const dummyMovies: MovieCardProps[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years...",
    image: Annika,
    rating: 5,
  },
];

const MoviePage = ({ params }: { params: { movieId: string } }) => {
  const [movie, setMovie] = useState<MovieCardProps | null>(null);
  useEffect(() => {
    const foundMovie = dummyMovies.find((m) => m.id === m.id);
    setMovie(foundMovie || null);
  }, [params.movieId]);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="page">
      <h1> {movie.title}</h1>
      <p>{movie.description}</p>
      {movie.image && <img src={movie.image.src} alt={movie.title} />}
      <p>Rating: {movie.rating}</p>
    </div>
  );
};

export default MoviePage;
