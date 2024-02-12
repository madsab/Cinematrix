"use client";

import Annika from "./assets/images/Anikka.jpeg";
import { MovieCardProps } from "./components/organisms/MovieCard";
import MovieScrollArea from "./components/MovieScrollArea";

const dummyMovies: MovieCardProps[] = [
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned",
    image: Annika,
    rating: 9.3,
  },
  {
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    image: Annika,
    rating: 9.2,
  },
  {
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    image: Annika,
    rating: 9.0,
  },
];

export default function Home() {
  return (
    <main className="">
      <div>Test</div>
      <MovieScrollArea movies={dummyMovies} />
    </main>
  );
}
