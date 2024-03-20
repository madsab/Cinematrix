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

type searchFilter = "actors" | "genres" | "movies" | null

export default function Search() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [movies, setMovies] = useState<Movie[]>();
  const [genres, setGenres] = useState<Genre[]>();
  const [actors, setActors] = useState<Actor[]>();

  const path = usePathname().split("/");
  let sw = path[path.length-1];

  //filter searchword
  let filter: searchFilter;
  if (sw[1] == ":") {
    switch (sw[0]) {
      case 'm':
        filter = "movies";
        break;
      case 'a':
        filter = "actors";
        break;
      case 'g':
        filter = "genres";
        break;
      default:
        filter = null;
    }
    if (filter) {
      sw = sw.substring(2);
    }
  }

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
      console.log("test");

      if (filter == "movies") {
        fetchMovies();
      } else if (filter == "actors") {
        fetchActors();
      } else if (filter == "genres") {
        fetchGenres();
      } else {
        fetchMovies();
        fetchActors();
        fetchGenres();      
      }
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
      {!(movies || actors || genres) ? (
        <div>Loading</div>
      ) : (
        <div>
          <div className="relative">
          <section className="backdrop-blur-sm bg-slate-950/30">
            <MovieScrollArea title={"Results for " + sw + "..."} movies={movies || []} genres={genres || []} actors={actors || []} />
          </section>
        </div>
        </div>
      )}
    </main>
  );
}
