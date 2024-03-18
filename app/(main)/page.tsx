"use client";

import MovieScrollArea from "../components/MovieScrollArea";
import { signOut } from "firebase/auth";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { Movie } from "../types/Movie";
import { Sponsored } from "../types/Sponsored";
import { auth } from "@/firebase/config";
import ImgCarousel from "../components/ImgCarousel";
import { Genre } from "../types/Genre";
import { Actor } from "../types/Actor";
import { useRouter } from "next/navigation";
import { calculateForYou } from "../algorithms/forYou";

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [userWatchedMovies, setUserWatchedMovies] = useState<string[]>([]);
  const [userLikedGenres, setUserLikedGenres] = useState<string[]>([]);
  const [userLikedActors, setUserLikedActors] = useState<string[]>([]);
  const [userLikedDirectors, setUserLikedDirectors] = useState<string[]>();
  const [forYouData, setForYouData] = useState<Movie[]>();

  const [sponsors, setSponsors] = useState<Sponsored[]>([]);

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

    /*
    const fetchActors = async () => {
      const res = await fetch("/api/actors", {
        method: "GET",
      });
      const data = await res.json();
      setActors(data);
    };
    */

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
        cache: "force-cache",
      });
      const data = await res.json();
      setUserLikedGenres(data);
    };

    const fetchUserActors = async () => {
      const res = await fetch(
        `/api/users/${user?.uid}/actors?type=ID&fieldType=actorsLiked`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setUserLikedActors(data);
    };

    const fetchUserDirectors = async () => {
      const res = await fetch(
        `/api/users/${user?.uid}/actors?type=ID&fieldType=directorsLiked`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setUserLikedDirectors(data);
    };

    if (notLoggedIn) {
      redirect("/signin");
    } else if (user) {
      fetchMovies();
      fetchGenres();
      fecthUserWacthedMovies();
      fetchUserGenres();
      fetchUserActors();
      fetchUserDirectors();
      //fetchActors();
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
          </section>

          <section>
            <MovieScrollArea
              title="Action"
              movies={movies.filter((movie) => movie.genre.includes("Action"))}
              userContent={userWatchedMovies}
            />
          </section>
          <section>
            <MovieScrollArea
              title="Drama"
              movies={movies.filter((movie) => movie.genre.includes("Drama"))}
              userContent={userWatchedMovies}
            />
          </section>
          <section>
            <MovieScrollArea
              title="Comedy"
              movies={movies.filter((movie) => movie.genre.includes("Comedy"))}
              userContent={userWatchedMovies}
            />
          </section>
          <section>
            <MovieScrollArea
              title="Movies so bad, you have to watch them!"
              movies={movies.filter((movie) => movie.genre.includes("Bad"))}
              userContent={userWatchedMovies}
            />
          </section>
          <section>
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
