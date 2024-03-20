import { db } from "@/firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NextRequest } from "next/server";

type fieldType = "ActedIn" | "DirectedIn" | null;

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") as string;
  try {
    const actorCollection = doc(db, "actors", id);
    const moviesCollection = collection(db, "movies");
    const fieldType = req.nextUrl.searchParams.get("fieldType") as fieldType;
    if (fieldType === null) {
      return new Response(
        JSON.stringify({ message: "Missing valid user, got: ", fieldType }),
        { status: 500 }
      );
    }
    const relevantMovies = (await getDoc(actorCollection)).get(fieldType) as [];
    const moviesRelevant: any[] = [];

    relevantMovies.forEach((movie: string) => {
      moviesRelevant.push(movie);
    });

    const data = await getDocs(
      query(moviesCollection, where("imdbid", "in", moviesRelevant))
    );

    const movies = data.docs.map((doc) => {
      const movieData = doc.data();
      movieData.id = doc.id;
      return movieData;
    });
    return new Response(JSON.stringify(movies));
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
