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
import {redirect} from "next/navigation";

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

    if (notLoggedIn) {
      redirect("/signin")
    }
    else {
      fetchActors().catch(console.error);
      fetchMovies().catch(console.error);
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
      <main>
        {loading ? (
                <div>Loading</div>
            ) : (
            <div>
              <div className="flex justify-between items-center mt-8 mb-5">
                <h1 className="text-3xl font-bold ml-4">Browse Movies</h1>

                <div className="flex space-x-4">
                  {/* Add as many DropDownMenu components as needed */}
                  <DropDownMenu actors={actors} Title="Actors 1"/>
                  <DropDownMenu actors={actors} Title="Actors 2"/>
                  {/* Add more DropDownMenu components as needed */}
                </div>
              </div>
              <MovieGridView movies={movies}/>
              <div>{user?.email}</div>
              <button onClick={() => signOut(auth)}>Logout</button>
            </div>
  )}
      </main>
  );
};
