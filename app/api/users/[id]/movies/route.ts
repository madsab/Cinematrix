import { db } from "@/firebase/config";
import { QueryFieldFilterConstraint, arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, QueryLimitConstraint, where, DocumentData, getDoc } from "firebase/firestore";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, params: {params: { id: string }}) {
    const fieldType = req.nextUrl.searchParams.get("fieldType") // Watched or Rated
    const type = req.nextUrl.searchParams.get("type") // ID or nothing (nothing will return the whole movie object (or a list of them..)
    const movieID = req.nextUrl.searchParams.get("movieID")
    const userMoviesDB = doc(db, "users", params.params.id)
    const movieDB = collection(db, "movies")
    const watchedMovies: any[] = []
    try{

        if (fieldType === "Watched") {
            const moviesWatched = (await getDoc(userMoviesDB)).get("moviesWatched") as []
            if (type === "ID") {
                return new Response(JSON.stringify(moviesWatched))
            }
            if (movieID !== null) {
                const data = await getDocs(query(movieDB, where(movieID, "in", watchedMovies)))

                const movies = data.docs.map((doc) => {
                    const movieData = doc.data();
                    movieData.id = doc.id;
                    return movieData;
                });
                return new Response(JSON.stringify(movies))
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

        }

        if (fieldType === "Rated") {
            const moviesRated = (await getDoc(userMoviesDB)).get("moviesRated") as []

            if (type === "ID") {
                return new Response(JSON.stringify(moviesRated))
            }
            const ratedMovies: any[] = []
            moviesRated.forEach( (movie) => {
                ratedMovies.push(movie)
            })
        }





    } catch (error) {

        return new Response("Error", {status: 200})
    }

}

export async function POST(req: NextRequest, params: {params: { id: string }}, res: NextApiResponse) {
    const type = req.nextUrl.searchParams.get("type")
    const userDoc = doc(db, "users", params.params.id)


    if (type === "MovieWatched") {
        const { movieImdbId  } = await req.json()
        await updateDoc(userDoc, {
            moviesWatched: arrayUnion(movieImdbId),
        })
    }
//movieRated is not stored as an Array, hence arrayUnion can't be used
    if (type === "MovieRatings") {
        let mapPush: any = new Map();
        const { movieImdbId, rating } = await req.json()
        mapPush.set(movieImdbId, rating)

        const field = (await getDoc(userDoc)).get("movieRated")
        console.log(field)
        const updatedData = {...field, ...mapPush}
        await updateDoc(userDoc, {
            moviesRated: updatedData
        })

    }
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

