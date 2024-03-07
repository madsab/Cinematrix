"use client";

import MovieScrollArea from "../../../components/MovieScrollArea";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { Movie } from "../../../types/Movie";
import { auth } from "@/firebase/config";
import { usePathname } from 'next/navigation'
import { Actor } from "@/app/types/Actor";
import { Genre } from "@/app/types/Genre";


export default function Search() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [movies, setMovies] = useState<Movie[]>();
  const [genres, setGenres] = useState<Genre[]>();
  const [actors, setActors] = useState<Actor[]>();

  const path = usePathname().split("/");
  const sw = path[path.length-1];
  const search = "../api/search?sw=" + sw + "&type=";

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(search+"movies", {
        method: "GET",
      });
      const data = await res.json();
      setMovies(data);
    };

    const fetchGenres = async () => {
      const res = await fetch(search+"genres", {
        method: "GET",
      });
      const data = await res.json();
      setGenres(data);
    };

    
    const fetchActors = async () => {
      const res = await fetch(search+"actors", {
        method: "GET",
      });
      const data = await res.json();
      setActors(data);
    };

    if (notLoggedIn) {
      redirect("/signin");
    } else {
      fetchMovies();
      fetchActors();
      fetchGenres();
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

  return (
    <main className="">
      {!movies ? (
        <div>Loading</div>
      ) : (
        <div>
          <div className="relative">
          <section className="backdrop-blur-sm bg-slate-950/30">
            <MovieScrollArea title={"Results for " + sw + "..."} movies={movies} genres={genres || []} actors={actors || []} />
          </section>
        </div>
        </div>
      )}
    </main>
  );
}
