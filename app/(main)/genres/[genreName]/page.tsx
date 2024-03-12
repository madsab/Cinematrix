
"use client";

import React from "react";
import MovieScrollArea from "../../../components/MovieScrollArea";
import { signOut } from "firebase/auth";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { Movie } from "../../../types/Movie";
import { Sponsored } from "../../../types/Sponsored";
import { auth } from "@/firebase/config";
import { Genre } from "@/app/types/Genre";
import { Icon } from "@iconify/react/dist/iconify.js";
import cn from "classnames";

interface Dictionary {
  [Key: string]: number;
}

export default function GenrePage ({ params }: { params: { genreName: string } }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genre, setGenre] = useState<Genre>();
  const [isLiked, setLiked] = useState(false);

  const [relatedGenres, setRelatedGenres] = useState();
  const heart = isLiked ? "tabler:heart" : "tabler:heart-off";

  const markAsLiked = () => {
    let method = !isLiked ? "POST" : "DELETE";
    user && saveToDb(method);
    setLiked(!isLiked);
  };

  const saveToDb = async (method: string) => {
    await fetch(`/api/users/${user?.uid}/genres`, {
      method: method,
      body: JSON.stringify({ genreID: params.genreName }),
    });
  };


  useEffect(() => {
    if (notLoggedIn) {
      redirect("/signin");
    }
  }, [notLoggedIn]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/genresPopular?genre=" + params.genreName, {
        method: "GET",
      });
      const data = await res.json() as Movie[];
      setMovies(data);      

      const relatedGenres: Dictionary = {};
      data.map((m: Movie) => {
        m.genre.map((g: string) => {
          if (g != params.genreName) {
            if (g in relatedGenres) {
              relatedGenres[g] ++;
            } else {
              relatedGenres[g] = 0;
            }
          }
        })
      })
      //The following method to create mostPopular was proposed by @connexo in:       
      //stackoverflow.com/questions/71927902/get-3-items-with-the-highest-values-from-javascript-dictionary
      const mostPopular = Object.entries(relatedGenres).sort(([a, b], [c, d]) => b-d).slice(0, 3).map((n) => n);
    };

    const fetchGenre = async () => {
      const res = await fetch("/api/search?sw=" + params.genreName + "&type=genres", {
        method: "GET",
      });
      const data = await res.json();
      setGenre(data[0]);      
    };
    const checkIfGenreLiked = async () => {
      const res = await fetch(
        `/api/users/${user?.uid}/genres?type=ID`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json() as String[];
      setLiked(data.includes(params.genreName));
    }

    user && fetchMovies();
    user && fetchGenre();
    user && checkIfGenreLiked();

  }, [user])

  auth.onAuthStateChanged((user) => {
    setLoading(false);

    if (user) {
      setUser(user);
      setNotLoggedIn(false);
    } else {
      setNotLoggedIn(true);
    }
  });

  return (
    <main className="bg-gradient-to-tr from-night to-sunset min-h-screen w-full ">
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="flex justify-center flex-wrap">
          <div className="relative flex justify-center flex-wrap mt-10 mb-10">
            <Icon
              icon={genre?.icon || ""}
              width={400}
              height={400}
              className="text-5xl text-center text-white opacity-20 blur-sm	w-full"
            />
            <div className="flex items-center w-full justify-center space-x-2 -mt-96 z-10">
              <h1 className="text-white text-6xl font-bold ">{params.genreName}</h1>
              <Icon
              icon={heart}
              width={60}
              height={60}
              onClick={() => user && markAsLiked()}
              className={cn(
                "hover:cursor-pointer ease-linear duration-100 rounded-md",
                isLiked ? "bg-white text-black" : "text-white")}
              />
            </div>
          </div>
          
          <div className="relative w-full">
            <MovieScrollArea
              title={"Movies in the genre " + params.genreName}
              movies={movies}
              actors={[]}
              genres={[]}
            />
          </div>
        </div>
      )}
    </main>
  );
}