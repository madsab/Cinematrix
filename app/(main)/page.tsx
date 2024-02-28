"use client";

import MovieScrollArea from "../components/MovieScrollArea";
import { signOut } from "firebase/auth";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { Movie } from "../types/Movie";
import { Sponsored } from "../types/Sponsored";
import { auth } from "@/firebase/config";
import ImageCarousel from "../components/ImageCarousel";


export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sponsors, setSponsors] = useState<Sponsored[]>([]);


  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies", {
        method: "GET",
      });
      const data = await res.json();
      setMovies(data);
    };

    const fetchSponsors = async () => {
      const res = await fetch("/api/sponsored", {
        method: "GET",
      });
      const data = await res.json();
      setSponsors(data);
    };

    if (notLoggedIn) {
      redirect("/signin");
    } else {
      fetchMovies();
      fetchSponsors();
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
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
            <div className="relative">
              <div className="relative container mx-auto mt-8 flex justify-content z-0">
                <ImageCarousel images={sponsors} />
              </div>
          <section className="-mt-[22%] backdrop-blur-sm bg-slate-950/30">
            <MovieScrollArea title="For You" movies={movies} />
          </section>
          <div>{user?.email}</div>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
        </div>
      )}
    </main>
  );
}
