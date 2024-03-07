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
import ImgCarousel from "../components/ImgCarousel";
import { Genre } from "../types/Genre";
import { Actor } from "../types/Actor";
import { Carousel } from 'flowbite-react';
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);

  const [sponsors, setSponsors] = useState<Sponsored[]>([]);


  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies", {
        method: "GET",
      });
      const data = await res.json();
      setMovies(data);
    };

    const fetchActors = async () => {
      const res = await fetch("/api/actors", {
        method: "GET",
      });
      const data = await res.json();
      setActors(data);
    };

    const fetchGenres = async () => {
      const res = await fetch("/api/genres", {
        method: "GET",
      });
      const data = await res.json();
      setGenres(data);
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
      fetchActors();
      fetchGenres();
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
          <ImgCarousel/>
          <section className="-mt-[5%] backdrop-blur-sm bg-slate-950/30">
            <MovieScrollArea title="For You" movies={movies} actors={[]} genres={[]} />
          </section>
          <section>
            <MovieScrollArea title="Genres" movies={[]} actors={[]} genres={genres} />
          </section>
          <section>
            <MovieScrollArea title="Actors" movies={[]} actors={actors} genres={[]} />
          </section>
          <div>{user?.email}</div>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>

      )}
    </main>
  );
}
