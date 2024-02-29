"use client";

import MovieScrollArea from "../../../components/MovieScrollArea";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { Movie } from "../../../types/Movie";
import { auth } from "@/firebase/config";
import { usePathname } from 'next/navigation'


export default function Search() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [movies, setMovies] = useState<Movie[]>();
  const path = usePathname().split("/");
  const sw = path[path.length-1];
  const search = "../api/search?sw=" + sw;

  useEffect(() => {
    const fetchSearched = async () => {
      console.log(search)

      const res = await fetch(search, {
        method: "GET",
      });
      const data = await res.json();
      setMovies(data);
    };

    if (notLoggedIn) {
      redirect("/signin");
    } else {
      fetchSearched();
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
            <MovieScrollArea title={"Results for " + sw + "..."} movies={movies} />
          </section>
        </div>
        </div>
      )}
    </main>
  );
}
