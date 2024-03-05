"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import MovieCard from "./organisms/MovieCard";
import cn from "classnames";
import { Separator } from "./atoms/Seperator";
import PopUp from "./organisms/PopUp";
import Stars, { StarsRef } from "./atoms/Stars";
import { Movie } from "../types/Movie";
import { auth } from "@/firebase/config";

interface MovieGridViewProps {
    movies: Movie[];
    className?: string;
}

const MovieGridView: FC<MovieGridViewProps> = ({
    movies,
    className,
}) => {
    const ref = useRef<StarsRef>(null);
    const [currentMovie, setCurrentMovie] = useState<Movie>();
    const [showRating, setShowRating] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [userMovieIDs, setUserMoviesIDs] = useState<string[]>();

    const closeRating = () => {
        setShowRating(!showRating);
        ref.current && ref.current.resetRating();
    };
    const openRating = (movie: Movie) => () => {
        setCurrentMovie(movie);
        setShowRating(!showRating);
    };

    const handleConfirm = () => {
        setShowRating(false);
        ref.current && ref.current.saveToDb();
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            }
        });

        const fecthUserWacthedMovies = async () => {
            const res = await fetch(
                `/api/users/${userId}/movies?fieldType=Watched&type=ID`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await res.json();
            setUserMoviesIDs(data);
        };
        userId && fecthUserWacthedMovies();
    }, [userId]);

    return (
        <div className={cn("p-4", className)}>
            {(
                <div>
                    <h2 className="text-2xl font-bold mb-4">Browse</h2>
                    <Separator />
                </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {movies && movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <MovieCard
                            key={index}
                            movie={movie}
                            alreadyWatched={userMovieIDs ? userMovieIDs?.includes(movie.imdbid) : false}
                            openRating={openRating(movie)}
                        />
                    ))
                ) : (
                    <div>No results</div>
                )}
            </div>
        </div>
    );
};

export default MovieGridView;