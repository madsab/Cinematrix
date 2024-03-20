"use client";

import MovieScrollArea from "../../../components/MovieScrollArea";
import { Actor } from "../../../types/Actor";
import { Movie } from "../../../types/Movie";
import { auth } from "../../../../firebase/config";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import cn from "classnames";

export default function ActorPage({ params }: { params: { actorId: string } }) {
  const [actor, setActor] = useState<Actor>();
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [ActedIn, setActedIn] = useState<Movie[]>([]);
  const [DirectedIn, setDirectedIn] = useState<Movie[]>([]);
  const [isLiked, setLiked] = useState(false);
  const heart = isLiked ? "tabler:heart" : "tabler:heart-off";

  const markAsLiked = () => {
    let method = !isLiked ? "POST" : "DELETE";
    saveToDb(method);
    setLiked(!isLiked);
  };

  const saveToDb = async (method: string) => {
    if (actor && actor.Directed.length > 0) {
      await fetch(`/api/users/${userId}/actors?fieldType=directorsLiked`, {
        method: method,
        body: JSON.stringify({ actorID: actor.id }),
      });
    }

    if (actor && actor.ActedIn.length > 0) {
      await fetch(`/api/users/${userId}/actors?fieldType=actorsLiked`, {
        method: method,
        body: JSON.stringify({ actorID: actor.id }),
      });
    }
  };

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

    const fetchActorsLiked = async () => {
      const res = await fetch(
        `/api/users/${userId}/actors?type=ID&fieldType=actorsLiked`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json() as string[];
      data.forEach(d => {
        if (params.actorId == d) 
          setLiked(true);
      })
    };

    const fetchDirectorsLiked = async () => {
      const res = await fetch(
        `/api/users/${userId}/actors?type=ID&fieldType=directorsLiked`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json() as string[];
      data.forEach(d => {
        if (params.actorId == d) 
          setLiked(true);
      })
    };

    if (notLoggedIn) {
      redirect("/signin");
    } else {
      userId && fetchActorsLiked();
      userId && fetchDirectorsLiked();
      userId && fetchActor();
      userId && fetchActedIn();
      userId && fetchDirectedIn();
    }
  }, [notLoggedIn, userId]);

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
          <div className="flex items-center justify-center md:justify-start">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              {actor?.name}
            </h1>
            <Icon
              icon={heart}
              width={50}
              height={50}
              onClick={() => markAsLiked()}
              className={cn(
                "ml-5 hover:cursor-pointer ease-linear duration-100 rounded-md",
                isLiked ? "bg-white text-black" : "text-white"
              )}
            />
          </div>
          {actor?.image && (
            <img
              src={actor.image}
              alt={actor.name}
              className="rounded-lg max-w-xs md:max-w-sm lg:max-w-md"
            />
          )}
        </div>
        <div className="flex flex-col justify-start p-5 w-1/2">
          {
            actor && actor.ActedIn.length > 0 &&
            <section>
            <MovieScrollArea
              title={"Movies " + (actor?.name || "") + " is actor in:"}
              movies={ActedIn}
              actors={[]}
              genres={[]}
            />
            </section>
          }

          {
            actor && actor.Directed.length > 0 &&
          <section>
              <MovieScrollArea
              title={"Movies " + (actor?.name || "") + " has directed:"}
              movies={DirectedIn}
              actors={[]}
              genres={[]}
            />
             </section>
          }
        </div>
      </div>
    </div>
  );
}
