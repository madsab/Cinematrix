"use client";

import MovieScrollArea from "../components/MovieScrollArea";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { Movie } from "../types/Movie";
import { auth } from "@/firebase/config";
import ImgCarousel from "../components/ImgCarousel";
import { Genre } from "../types/Genre";
import { calculateForYou } from "../algorithms/forYou";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [PopularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [userWatchedMovies, setUserWatchedMovies] = useState<string[]>([]);
  const [userLikedGenres, setUserLikedGenres] = useState<string[]>([]);
  const [forYouData, setForYouData] = useState<Movie[]>();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(false);

      if (user) {
        setUser(user);
        setNotLoggedIn(false);
      } else {
        setNotLoggedIn(true);
      }
    });

    const fetchMovies = async () => {
      const res = await fetch("/api/movies", {
        method: "GET",
      });
      const data = await res.json();
      setMovies(data);
    };

    const fetchPopularMovies = async () => {
      const res = await fetch("/api/PopularMovies", {
        method: "GET",
        cache: "force-cache",
      });
      const data = await res.json();
      setPopularMovies(data);
    };

    const fetchGenres = async () => {
      const res = await fetch("/api/genres", {
        method: "GET",
      });
      const data = await res.json();
      setGenres(data);
    };

    const fecthUserWacthedMovies = async () => {
      const res = await fetch(
        `/api/users/${user?.uid}/movies?fieldType=Watched&type=ID`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setUserWatchedMovies(data);
    };

    const fetchUserGenres = async () => {
      const res = await fetch(`/api/users/${user?.uid}/genres?type=ID`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUserLikedGenres(data);
    };

    if (notLoggedIn) {
      redirect("/signin");
    } else if (user) {
      fetchMovies();
      fetchPopularMovies();
      fetchGenres();
      fecthUserWacthedMovies();
      fetchUserGenres();
    }
  }, [notLoggedIn, user]);

  useEffect(() => {
    const forYou = () => {
      const res = calculateForYou(movies, userWatchedMovies);
      setForYouData(res);
    };

    !(userWatchedMovies.length == 0) && forYou();
  }, [movies, userWatchedMovies]);

  return (
    <main className="">
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <ImgCarousel />

          <section className="-mt-[5%] backdrop-blur-sm pt-5">
            {!(userWatchedMovies.length == 0) && (
              <MovieScrollArea
                title="For You"
                movies={forYouData}
                userContent={userWatchedMovies}
              />
            )}

            <MovieScrollArea
              title="Top 10 movies"
              movies={PopularMovies}
              isTopTen={true}
              userContent={userWatchedMovies}
            />

            <MovieScrollArea
              title="Action"
              movies={movies.filter((movie) => movie.genre.includes("Action"))}
              userContent={userWatchedMovies}
            />

            <MovieScrollArea
              title="Drama"
              movies={movies.filter((movie) => movie.genre.includes("Drama"))}
              userContent={userWatchedMovies}
            />

            <MovieScrollArea
              title="Comedy"
              movies={movies.filter((movie) => movie.genre.includes("Comedy"))}
              userContent={userWatchedMovies}
            />

            <MovieScrollArea
              title="Movies so bad, you have to watch them!"
              movies={movies.filter((movie) => movie.genre.includes("Bad"))}
              userContent={userWatchedMovies}
            />

            <MovieScrollArea
              title="Our genres"
              genres={genres}
              userContent={userLikedGenres}
              movies={[]}
              actors={[]}
            />
          </section>
        </div>
      )}
    </main>
  );
}
