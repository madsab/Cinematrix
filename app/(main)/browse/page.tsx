// pages/browse.js
"use client";

import { signOut } from "firebase/auth";

import { useEffect, useState } from "react";
import MovieGridView from '../../components/MovieGridView';
import { User as FirebaseUser } from "firebase/auth";
import { Movie } from "../../types/Movie";
import { auth } from "@/firebase/config";
import DropDownMenu from "@/app/components/DropDownMenu";
import { Actor } from "../../types/Actor";

export default function Browse(){
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [notLoggedIn, setNotLoggedIn] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [actors, setActors] = useState<Actor[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('/api/movies', { method: 'GET' });
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


    fetchActors().catch(console.error);
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Browse Movies</h1>

          <div className="flex space-x-4">
            {/* Add as many DropDownMenu components as needed */}
            <DropDownMenu actors={actors} Title="Actors 1"/>
            <DropDownMenu actors={actors} Title="Actors 2"/>
            {/* Add more DropDownMenu components as needed */}
          </div>
        </div>
        <MovieGridView movies={movies}/>
      </main>
  );
};
