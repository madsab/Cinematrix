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
import { Genre } from "../types/Genre";
import { Actor } from "../types/Actor";



export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [action, setAction] = useState<Movie[]>([]);
  const [drama, setDrama] = useState<Movie[]>([]);
  const [comedy, setComedy] = useState<Movie[]>([]);
  const [PopularMovies, setPopularMovies] = useState<Movie[]>([]);

  const [sponsors, setSponsors] = useState<Sponsored[]>([]);


  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies", {
        method: "GET",
      });
      const data = await res.json();
      setMovies(data);
    };

    const fetchPopularMovies = async () => {
      const res = await fetch("/api/PopularMovies", {
        method: "GET",
      });
      const data = await res.json();
      setPopularMovies(data);
    };

    const fetchDrama = async () => {
      const res = await fetch("/api/genresPopular?genre=Drama", {
        method: "GET",
      });
      const data = await res.json();
      setDrama(data);
    };
    const fetchComedy = async () => {
      const res = await fetch("/api/genresPopular?genre=Comedy", {
        method: "GET",
      });
      const data = await res.json();
      setComedy(data);
    };


    const fetchAction = async () => {
      const res = await fetch("/api/genresPopular?genre=Action", {
        method: "GET",
      });
      const data = await res.json();
      setAction(data);
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
      fetchAction();
      fetchDrama();
      fetchComedy();
      fetchPopularMovies();
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
            <MovieScrollArea title="For You" movies={movies} actors={[]} genres={[]} />

            <MovieScrollArea title="Top 10 movies" movies={PopularMovies} actors={[ ]} genres={[]} isTopTen=      {true} />
            
            <MovieScrollArea title="Action" movies={action} actors={[]} genres={[]} />
        
            <MovieScrollArea title="Drama" movies={drama} actors={[]} genres={[]} />
         
            <MovieScrollArea title="Comedy" movies={comedy} actors={[]} genres={[]} />
      
            <MovieScrollArea title="Genres" movies={[]} actors={[]} genres={genres} />
    
            <MovieScrollArea title="Actors" movies={[]} actors={actors} genres={[]} />
          </section>
          
          <div>{user?.email}</div>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
        </div>
      )}
    </main>
  );



}
