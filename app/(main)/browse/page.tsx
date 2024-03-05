// pages/browse.js
"use client";

import { signOut } from "firebase/auth";

import { useEffect, useState } from "react";
import MovieGridView from '../../components/MovieGridView';
import { User as FirebaseUser } from "firebase/auth";
import { Movie } from "../../types/Movie";
import { auth } from "@/firebase/config";

export default function Browse(){
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [notLoggedIn, setNotLoggedIn] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('/api/movies', { method: 'GET' });
      const data = await res.json();
      setMovies(data);
    };

    fetchMovies().catch(console.error);


  }, []);

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
    <main>
      <h1 className="text-center text-3xl font-bold my-8">Browse Movies</h1>
      <MovieGridView movies={movies} />
    </main>
  );
};
