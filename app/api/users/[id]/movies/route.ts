import { db } from "@/firebase/config";
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where, getDoc, setDoc } from "firebase/firestore";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

type fieldType = "Watched" | "Rated" | "Liked" | null
type type = "ID" | null
type movieID = string | null

export async function GET(req: NextRequest, params: {params: { id: string }}) {
    const fieldType = req.nextUrl.searchParams.get("fieldType") as fieldType // Watched or Rated
    const type = req.nextUrl.searchParams.get("type") as type // ID or nothing (nothing will return the whole movie object (or a list of them..)
    const movieID = req.nextUrl.searchParams.get("movieID") as movieID // The ID of the movie to get
    const userID = params.params.id

    const userMoviesDB = doc(db, "users", userID)
    const movieDB = collection(db, "movies")

    try{
        if (userID === "null" || !userID){
            return new Response(JSON.stringify({message: "Missing valid user, got: ", userID }), {status: 500})
        }

        if (fieldType === "Watched" || fieldType === "Liked") {
            var dbName: string
            if (fieldType === "Watched") {
                dbName = "moviesWatched";
            } else {
                dbName = "moviesLiked"
            }
            const moviesWatched = (await getDoc(userMoviesDB)).get(dbName) as []
            // Get all movie IDs watched/liked by the user
            if (type === "ID") {
                return new Response(JSON.stringify(moviesWatched))
            }
            // Get movie object by ID
            if (movieID !== null) {
                const data = (await getDoc(doc(movieDB, movieID)))
                const movie = data.data()
                if (movie){
                    movie.id = data.id
                } else {
                    return new Response(JSON.stringify({message: fieldType + ": Movie not found"}), {status: 404})
                }

                return new Response(JSON.stringify(movie))
            }
            const watchedMovies: any[] = []
            //Had to add moviesWatched/Liked to an array to be able to use it in next query, or else moviesWatched/Liked would be empty.
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
        }

        if (fieldType === "Rated") {
            let moviesRated = (await getDoc(userMoviesDB)).get("moviesRated")
            if (type === "ID") {
                return new Response(JSON.stringify(Object.keys(moviesRated as {})))
            }
            if (movieID !== null) {
                const rating = moviesRated[movieID]
                if (rating){
                    return new Response(JSON.stringify(rating))
                } else {
                    return new Response(JSON.stringify(0))
                }
            }
            moviesRated = Object.keys(moviesRated)
            const data = await getDocs(query(movieDB, where("imdbid", "in", moviesRated)))

            const movies = data.docs.map((doc) => {
                const movieData = doc.data();
                movieData.id = doc.id;
                return movieData;
            });
            return new Response(JSON.stringify(movies))

        }
        
        return new Response(JSON.stringify({message: "Missing right parameters" }), {status: 500})

    } catch (error) {
        return new Response(JSON.stringify({message: "Unexpected error: " + error }), {status: 500})
    }

}

export async function POST(req: NextRequest, params: {params: { id: string }}) {
    const fieldType = req.nextUrl.searchParams.get("fieldType")
    const userDoc = doc(db, "users", params.params.id)


    if (fieldType === "Watched") {
        const { movieImdbId } = await req.json();
        await updateDoc(userDoc, {
            moviesWatched: arrayUnion(movieImdbId),
        })
        return new Response(JSON.stringify({message: "Movie added to watched"}), {status: 201})
    }

    if (fieldType === "Liked") {
        const { movieImdbId } = await req.json();
        await updateDoc(userDoc, {
            moviesLiked: arrayUnion(movieImdbId),
        })
        return new Response(JSON.stringify({message: "Movie added to liked"}), {status: 201})
    }

    if (fieldType === "Rated") {
        const { movieImdbId, rating } = await req.json()
        console.log("MovieID: ", movieImdbId, "Rating: ", rating)
        await setDoc(userDoc, {
            moviesRated: {[movieImdbId]: rating}
        }, {merge: true})
        return new Response(JSON.stringify({message: "Movie added to rated"}), {status: 201})

    }
    return new Response(JSON.stringify({message: "Missing right parameters" }), {status: 500})
}

export async function DELETE(req: NextRequest, params: {params: { id: string }}, res: NextApiResponse) {
    const fieldType = req.nextUrl.searchParams.get("fieldType")

    const { movieImdbId } = await req.json()
    const userDoc = doc(db, "users", params.params.id)
    if (fieldType === "Watched") {
        await updateDoc(userDoc, {
            moviesWatched: arrayRemove(movieImdbId),
        })
    }

    else if (fieldType === "Liked") {
        await updateDoc(userDoc, {
            moviesLiked: arrayRemove(movieImdbId),
        })
    }
    return new Response(JSON.stringify({message: "Deletion successful"}), {status: 200})
}

