"use client";

import MovieScrollArea from "./components/MovieScrollArea";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config"; // db can be imported from here
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Movie } from "./types/Movie";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  const router = useRouter();

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoading(false);
    } else {
      try {
        router.push("/signin");
      } catch (error) {
        /*
        Fant ikke ut hvordan jeg stopper router fra å
        lage en error, alt fungerer... håper jeg :o
        */
      }
    }
  });

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies", {
        method: "GET",
      });
      const data = await res.json();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  return (
    <main className="">
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <section className="mt-4">
            <MovieScrollArea title="Popular" movies={movies} />
          </section>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      )}
    </main>
  );
}
