import { db } from "@/firebase/config";
import { QueryFieldFilterConstraint, arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, QueryLimitConstraint, where, DocumentData, getDoc } from "firebase/firestore";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, params: {params: { id: string }}) {
    const type = req.nextUrl.searchParams.get("type")
    const userMoviesDB = doc(db, "users", params.params.id)
    const movieDB = collection(db, "movies")
    const watchedMovies: any[] = []
    try{
        const moviesWatched = (await getDoc(userMoviesDB)).get("moviesWatched") as []
        if (type === "id") {
            return new Response(JSON.stringify(moviesWatched))
        }
        //Had to add moviesWatched to an array to be able to use it in next query, or else moviesWatched would be empty.
        moviesWatched.forEach((movie) => {
            watchedMovies.push(movie)
        })
        const data = await getDocs(query(movieDB, where("imdbid", "in", watchedMovies)))

        const movies = data.docs.map((doc) => {
            const movieData = doc.data();
            movieData.id = doc.id;
            return movieData;
        });
        return new Response(JSON.stringify(movies))


    } catch (error) {

        return new Response("Error", {status: 200})
    }

}

export async function POST(req: NextRequest, params: {params: { id: string }}, res: NextApiResponse) {
    const { movieImdbId  } = await req.json()
    const userDoc = doc(db, "users", params.params.id)
    await updateDoc(userDoc, {
        moviesWatched: arrayUnion(movieImdbId),
    })
    return res.status(201)
}

export async function DELETE(req: NextRequest, params: {params: { id: string }}, res: NextApiResponse) {
    const { movieImdbId  } = await req.json()
    const userDoc = doc(db, "users", params.params.id)
    await updateDoc(userDoc, {
        moviesWatched: arrayRemove(movieImdbId),
    })
    return res.status(200)
}

