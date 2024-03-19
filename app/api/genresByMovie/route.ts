import { Genre } from "@/app/types/Genre";
import { db } from "@/firebase/config";
import { collection, doc, getDocs, query, where, getDoc } from "firebase/firestore";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const movieID = req.nextUrl.searchParams.get("movieID") as string; 

    const movieDB = doc(db, "movies", movieID);

    try{
        const relevantGenres = (await getDoc(movieDB)).get("genre") as []

        const genresRelevant: any[] = []

        relevantGenres.forEach((genre: string) => {
            genresRelevant.push(genre)
        })

        const result: any[] = []

        console.log(genresRelevant);

        for(let i = 0; i < genresRelevant.length; i++) {
            const genreDB = doc(db, "genres", genresRelevant[i]);
            const data = await getDoc(genreDB)
            const genre: Genre = {
                id: genresRelevant[i],
                icon: data.get("icon"),
                sw: data.get("sw")
            }
            result.push(genre);
        }
 
        return new Response(JSON.stringify(result))

    } catch (error) {
        return new Response(JSON.stringify({message: "Unexpected error: " + error }), {status: 500})
    }

}