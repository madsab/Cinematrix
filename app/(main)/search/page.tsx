"use client";

import MovieScrollArea from "../../components/MovieScrollArea";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { Movie } from "../../types/Movie";
import { auth } from "@/firebase/config";

export default function Search() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    const fetchSearched = async () => {

      const res = await fetch("../api/search?sw=", {
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
            <MovieScrollArea title={"Results for ..."} movies={movies} actors={[]} genres={["Action"]} />
          </section>
        </div>
        </div>
      )}
    </main>
  );
}
