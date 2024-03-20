"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { auth } from "@/firebase/config";
import { Genre } from "../../types/Genre";
import MovieScrollArea from "@/app/components/MovieScrollArea";

export default function Genres() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [userLikedGenres, setUserLikedGenres] = useState<string[]>([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(false);

      if (user) {
        setUser(user);
        setNotLoggedIn(false);
      } else {
        setNotLoggedIn(true);
      }
    });

    const fetchGenres = async () => {
      const res = await fetch("/api/genres", {
        method: "GET",
      });
      const data = await res.json();
      setGenres(data);
    };

    const fetchUserGenres = async () => {
      const res = await fetch(`/api/users/${user?.uid}/genres?type=ID`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      });
      const data = await res.json();
      setUserLikedGenres(data);
    };

    if (notLoggedIn) {
      redirect("/signin");
    } else if (user) {
      fetchGenres();
      fetchUserGenres();
    }
  }, [notLoggedIn, user]);

  return (
    <main className="">
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <section>
            <MovieScrollArea
                title="Our genres"
                genres={genres}
                userContent={userLikedGenres} movies={[]} actors={[]}            />
          </section>
        </div>
      )}
    </main>
  );
}
