"use client";
import React, { useState, useEffect } from "react";
import Annika from "../../assets/images/Anikka.jpeg";
import { MovieCardProps } from "../../components/organisms/MovieCard";
import "./page.css";

const dummyMovies: MovieCardProps[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    description:
      "Chronicles the experiences of a Chronicles the experiences of a formerly successful banker as a prisoner in the Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
    image: Annika,
    rating: 5,
    actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
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
      <div className="movielayout">
        {movie.image && (
          <div className="movie-image">
            <img src={movie.image.src} alt={movie.title} />
          </div>
        )}
        <div className="movieinfo">
          <h1 className="title">{movie.title}</h1>
          <p className="description">{movie.description}</p>
          <p className="actors">
            <b>Actors:</b> {movie.actors?.join(", ")}
          </p>
          <p className="rating">
            {" "}
            <b>Rating:</b> {movie.rating}/5
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
