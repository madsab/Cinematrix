"use client";
import Annika from "./assets/images/Anikka.jpeg";
import { MovieCardProps } from "./components/organisms/MovieCard";
import MovieScrollArea from "./components/MovieScrollArea";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config"; // db can be imported from here
import { useRouter } from "next/navigation";
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
      "kjhkjhkljh khl ljk lk gjkh gjh gjhgjhghkjghjk jgkhhjgjhkg jkghjgjkhgkhjg",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    image: Annika,
    rating: 1,
  },
];

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
        <div>
          <section className="mt-4">
            <MovieScrollArea title="For You" movies={dummyMovies} />
          </section>
          <div>Logged in with mail: {mail}</div>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      )}
    </main>
  );
}
