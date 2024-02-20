"use client";
import Annika from "./assets/images/Anikka.jpeg";
import { MovieCardProps } from "./components/organisms/MovieCard";
import MovieScrollArea from "./components/MovieScrollArea";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config"; // db can be imported from here
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ImageCarousel from "./components/ImageCarousel";
import ImageCarousel2 from "./components/ImageCarousel2";
import Image from 'next/image';
import React from "react";
import img_1 from "./assets/images/img_1.jpeg";
import img_2 from "./assets/images/img_2.png";
import img_3 from "./assets/images/img_3.jpeg";




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
      "kjhkjhkljh khl ljk lk gjkh gjh gjhgjhghkjghjk ",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    image: Annika,
    rating: 1,
  },
];

const images = [
    "https://newshour-classroom-tc.digi-producers.pbs.org/uploads/images/Oppenheimer-Christopher-Nolan-0-1.width-1024_Kh9HV7C.jpg", 
    "https://i.ytimg.com/vi/eVgZn81e_nY/maxresdefault.jpg",
    "https://reviewersunite.files.wordpress.com/2019/10/jokercd0.png",
  /*
  "./assets/images/Annika.jpeg",
  "./assets/images/img_2.png",
  "./assets/images/img_3.jpeg", */ 
]

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mail, setMail] = useState<string>("");

  const router = useRouter();

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid);
      setLoading(false);
      setMail(user.email as string);
    } else {
      try {
        router.push("/signin");
      } catch (error) {
        /*
        Fant ikke ut hvordan jeg stopper router fra å
        lage en error, alt fungerer... håper jeg :o
        */
      }
    }
  });


  return (
    <main className="">
      {loading ? (
        <div>Loading</div>
      ) : (
        
        <div className="relative">
            <div className="relative container mx-auto mt-8 flex w-screen justify-content z-0">
              <ImageCarousel2 images={images} />
            </div>
        <div className="relative -mt-80">
          <section className="mt-4 pt-300  left-0 w-full h-100 bg-black bg-opacity-0 z-10">
            <MovieScrollArea className="" title="For You" movies={dummyMovies} />
            </section>
            <section className="mt-4 pt-300 left-0 w-full h-100 bg-black bg-opacity-80 z-10">
              <MovieScrollArea className="" title="Popular right now" movies={dummyMovies} />
           </section>
           <section className="mt-4 pt-300 left-0 w-full h-100 bg-black bg-opacity-80 z-10">
             <MovieScrollArea className="" title="Classics" movies={dummyMovies} />
           </section>
        </div>
          <div className="z-10 mb-2 bottom-0 absolute ml-40" >Logged in with mail: {mail}</div>
          <button className="z-10 mb-2 bottom-0 absolute" onClick={() => signOut(auth)}>Logout</button>
        </div>
      )}
    </main>
  );
}
