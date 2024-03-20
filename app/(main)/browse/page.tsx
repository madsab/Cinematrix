// pages/browse.js
"use client";

import { signOut } from "firebase/auth";

import React, { useEffect, useState } from "react";
import MovieGridView from "../../components/MovieGridView";
import { User as FirebaseUser } from "firebase/auth";
import { Movie } from "../../types/Movie";
import { auth } from "@/firebase/config";
import DropDownMenu from "@/app/components/DropDownMenu";
import { redirect } from "next/navigation";
import { Genre } from "@/app/types/Genre";
import ButtonSort from "@/app/components/atoms/ButtonSort";

export default function Browse() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [current, setCurrent] = useState("");
  const [nameSort, setNameSort] = useState(false);
  const [ratingSort, setRatingSort] = useState(true);
  const [nameToogled, setNameToogled] = useState(false);
  const [ratingToogled, setRatingToogled] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies", { method: "GET" });
      const data = await res.json();
      setMovies(data);
    };

    const fetchGenres = async () => {
      const res = await fetch("/api/genres", {
        method: "GET",
      });
      const data = await res.json();
      setGenres(data);
    };

    if (notLoggedIn) {
      redirect("/signin");
    } else {
      fetchGenres().catch(console.error);
      fetchMovies().catch(console.error);
    }
  }, [notLoggedIn]);

  auth.onAuthStateChanged((user) => {
    setLoading(false);

    if (user) {
      console.log(user.uid);
      setUser(user);
      setNotLoggedIn(false);
    } else {
      setNotLoggedIn(true);
    }
  });

  useEffect(() => {
    if (nameSort) {
      setNameToogled(true);
      setRatingToogled(false);

      if (ratingSort && nameSort) {
        setRatingSort(!ratingSort);
      }
    }
  }, [nameSort]);

  function compareMovies(a: Movie, b: Movie) {
    if (nameToogled) {
      return nameSort
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (ratingToogled) {
      return !ratingSort
        ? Number(a.rating) - Number(b.rating)
        : Number(b.rating) - Number(a.rating); //Gjør om fra string til number
    }
    return 0;
  }

  useEffect(() => {
    if (ratingSort) {
      setRatingToogled(true);
      setNameToogled(false);

      if (nameSort && ratingSort) {
        setNameSort(!nameSort);
      }
    }
  }, [ratingSort]);

  return (
    <main>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <div className="flex justify-between items-center mt-8 mb-5">
            <h1 className="text-3xl font-bold ml-4">Browse {current} Movies</h1>

            <div className="flex gap-8">
              <ButtonSort
                title="Name"
                droppedDown={nameSort}
                setDroppedDown={setNameSort}
                toogled={nameToogled}
                useDot={true}
              ></ButtonSort>
              <ButtonSort
                title="Rating"
                droppedDown={ratingSort}
                setDroppedDown={setRatingSort}
                toogled={ratingToogled}
                useDot={true}
              ></ButtonSort>
              <DropDownMenu
                genres={genres}
                Title="Genres"
                current={current}
                setCurrent={setCurrent}
              />
            </div>
          </div>
          <MovieGridView
            movies={
              current == ""
                ? movies.slice().sort((a, b) => compareMovies(a, b))
                : movies
                    .filter((movie) => movie.genre.includes(current))
                    .slice()
                    .sort((a, b) => compareMovies(a, b))
            }
          />
        </div>
      )}
    </main>
  );
}
