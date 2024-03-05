"use client";

import {useState} from "react";
import {User as FirebaseUser} from "@firebase/auth";
import MovieCard from "./organisms/MovieCard";
import cn from "classnames";
import PopUp from "./organisms/PopUp";
import Stars, { StarsRef } from "./atoms/Stars";
import { Movie } from "../types/Movie";
import { auth } from "@/firebase/config";

export default function Browse(){

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [notLoggedIn, setNotLoggedIn] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);


    return(
        <div>
            Browse
        </div>
    )
}