import { db } from "@/firebase/config";
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where, getDoc, setDoc } from "firebase/firestore";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

type type = "ID" | null
type genreID = string | null


export async function GET(req: NextRequest, params: {params: { id: string }}) {
    const type = req.nextUrl.searchParams.get("type") as type 
    const genreID = req.nextUrl.searchParams.get("genreID") as genreID 
    const userID = params.params.id

    const userGenresDB = doc(db, "users", userID)
    const genreDB = collection(db, "genres")

    try{
        if (userID === "null" || !userID){
            return new Response(JSON.stringify({message: "Missing valid user, got: ", userID }), {status: 500})
        }

        const genresLiked = (await getDoc(userGenresDB)).get("genresLiked") as []

        if (type === "ID") {
            return new Response(JSON.stringify(genresLiked))
        }

        if (genreID !== null) {
            const data = (await getDoc(doc(genreDB, genreID)))
            const genre = data.data()
            if (genre){
                genre.id = data.id
            } else {
                return new Response(JSON.stringify({message: "Genre not found"}), {status: 404})
            }

            return new Response(JSON.stringify(genre))
        }
        const likedGenres: any[] = []

        genresLiked.forEach((genre: string) => {
            likedGenres.push(genre.toLowerCase()) // make lowercase bcus sw deals with lowercase
        })
        const data = await getDocs(query(genreDB, where("sw", "in", likedGenres)))

        const genres = data.docs.map((doc) => {
            const genreData = doc.data();
            genreData.id = doc.id;
            return genreData;
        });
        return new Response(JSON.stringify(genres))

    } catch (error) {
        return new Response(JSON.stringify({message: "Unexpected error: " + error }), {status: 500})
    }

}

export async function POST(req: NextRequest, params: {params: { id: string }}) {
    const userDoc = doc(db, "users", params.params.id)

    const { genreID } = await req.json();
    await updateDoc(userDoc, {
        genresLiked: arrayUnion(genreID),
    })
    return new Response(JSON.stringify({message: "Genre added to likedGenres"}), {status: 201})
}

export async function DELETE(req: NextRequest, params: {params: { id: string }}, res: NextApiResponse) {
    const { genreID } = await req.json()
    const userDoc = doc(db, "users", params.params.id)
    await updateDoc(userDoc, {
        genresLiked: arrayRemove(genreID),
    })
    return new Response(JSON.stringify({message: "Deletion successful"}), {status: 200})
}

