"use client";

import MovieScrollArea from "@/app/components/MovieScrollArea";
import { Actor } from "@/app/types/Actor";
import { Movie } from "@/app/types/Movie";
import { auth } from "@/firebase/config";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ActorPage({ params }: { params: { actorId: string } }) {
  const [actor, setActor] = useState<Actor>();
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [ActedIn, setActedIn] = useState<Movie[]>([]);
  const [DirectedIn, setDirectedIn] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchActor = async () => {
      const res = await fetch("/api/getActorByID?id=" + params.actorId, {
        method: "GET",
      });
      const data = await res.json();
      setActor(data);
    };

    const fetchActedIn = async () => {
      const res = await fetch(
        "/api/getActorMovies?id=" + params.actorId + "&fieldType=ActedIn",
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setActedIn(data);
    };

    const fetchDirectedIn = async () => {
      const res = await fetch(
        "/api/getActorMovies?id=" + params.actorId + "&fieldType=Directed",
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setDirectedIn(data);
    };

    if (notLoggedIn) {
      redirect("/signin");
    } else {
      fetchActor();
      fetchActedIn();
      fetchDirectedIn();
    }
  }, [notLoggedIn]);

  auth.onAuthStateChanged((user) => {
    setLoading(false);
    if (user) {
      setNotLoggedIn(false);
      setUserId(user.uid);
    } else {
      setNotLoggedIn(true);
    }
  });

  return loading ? (
    <div> Loading </div>
  ) : (
    <div className="bg-gradient-to-r from-black to-[#801336] text-white overflow-hidden shadow-lg p-5 min-h-screen w-full">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
        <div className="text-center md:text-left md:mr-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 ">
            {actor?.name}
          </h1>
          {actor?.image && (
            <img
              src={actor.image}
              alt={actor.name}
              className="rounded-lg max-w-xs md:max-w-sm lg:max-w-md"
            />
          )}
        </div>
        <div className="flex flex-col justify-start p-5">
          <section>
            <MovieScrollArea
              title={"Movies " + (actor?.name || "") + " is actor in:"}
              movies={ActedIn}
              actors={[]}
              genres={[]}
            />
          </section>
          <section>
            <MovieScrollArea
              title={"Movies " + (actor?.name || "") + " has directed:"}
              movies={DirectedIn}
              actors={[]}
              genres={[]}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
