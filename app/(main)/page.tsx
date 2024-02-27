"use client";

import MovieScrollArea from "../components/MovieScrollArea";
import { signOut } from "firebase/auth";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { Movie } from "../types/Movie";
import { auth } from "@/firebase/config";
import ImageCarousel from "../components/ImageCarousel";

const images = [
  "https://scontent.cdninstagram.com/v/t39.30808-6/429761703_18280419856163301_126198347695304338_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=109&_nc_ohc=NvXTfDr5BXsAX8Txt19&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzMxMDk3MTQ2MzA0MzY1OTI0Mg%3D%3D.2-ccb7-5&oh=00_AfCMgWb1PPtwS1MfbMxjRTj_Gi8XC8wedUhEnsUk1fmShw&oe=65E21B6C&_nc_sid=10d13b",
    "https://m.media-amazon.com/images/M/MV5BY2I4MmM1N2EtM2YzOS00OWUzLTkzYzctNDc5NDg2N2IyODJmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UX380_CR0,4,380,562_.jpg",
    "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/5C8D13FFDEA93C10069A51DDA07050A362726ADCA060AACEE5DACB61CD3F7891/scale?width=1200&aspectRatio=1.78&format=webp",
    "https://newshour-classroom-tc.digi-producers.pbs.org/uploads/images/Oppenheimer-Christopher-Nolan-0-1.width-1024_Kh9HV7C.jpg", 
    "https://i.ytimg.com/vi/eVgZn81e_nY/maxresdefault.jpg",
    "https://reviewersunite.files.wordpress.com/2019/10/jokercd0.png",
]


export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies", {
        method: "GET",
      });
      const data = await res.json();
      setMovies(data);
    };

    if (notLoggedIn) {
      redirect("/signin");
    } else {
      fetchMovies();
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
                <ImageCarousel images={images} />
              </div>
          <section className="-mt-80">
            <MovieScrollArea title="For You" movies={movies} />
          </section>
          <div>{user?.email}</div>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
        </div>
      )}
    </main>
  );
}
