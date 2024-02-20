"use client";
import Annika from "../../assets/images/Anikka.jpeg";
import { MovieCardProps } from "../../components/organisms/MovieCard";
import MovieScrollArea from "../../components/MovieScrollArea";
import { auth } from "@/app/firebase/config"; // db can be imported from here
import { useState } from "react";



const dummyMovies: MovieCardProps[] = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      description: "Two imprisoned",
      image: Annika,
      rating: 4,
    },
    {
      id: 2,
      title: "The Godfather",
      description:
        "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      image: Annika,
      rating: 2,
    },
    {
        id: 3,
        title: "The Dark Knight",
        description:
          "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        image: Annika,
        rating: 1,
      },
      {
        id: 1,
        title: "The Shawshank Redemption",
        description: "Two imprisoned",
        image: Annika,
        rating: 3,
      },
      {
        id: 2,
        title: "The Godfather",
        description:
          "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        image: Annika,
        rating: 3,
      },
      {
        id: 3,
        title: "The Dark Knight",
        description:
          "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        image: Annika,
        rating: 4,
      },
      {
        id: 1,
        title: "The Shawshank Redemption",
        description: "Two imprisoned",
        image: Annika,
        rating: 4,
      },
      {
        id: 2,
        title: "The Godfather",
        description:
          "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        image: Annika,
        rating: 2,
      },
      {
        id: 3,
        title:
          "kjhkjhkljh khl ljk lk gjkh gjh gj",
        description:
          "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        image: Annika,
        rating: 1,
      },
  ];

const Profile = () => {
    return(
        <div className=" flex w-full mt-10">
            {/* If filter is wanted on the profile page, this can be used for that component
            <div className=" mt-10 w-1/5">
                <h3 className=" text-center">Filter</h3>
            </div>
            */}
            <div className=" ml-20 w-4/5" >
                    <MovieScrollArea title="Your ratings:" movies={dummyMovies} />

                    <MovieScrollArea title="Movies you've seen:" movies={dummyMovies} />
            </div>
        </div>

    )
}
export default Profile
