import { db } from "@/firebase/config";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    const id= req.nextUrl.searchParams.get('id') as string;
    try {
        const movieCollection = collection(db, "movies")
        const q = query(movieCollection, where("imdbid", "==", id))
        const data = await getDocs(q)
        const movies = data.docs.map((doc) => {
            const movieData = doc.data();
            movieData.id = doc.id;
            return movieData;
        });
        return new Response(JSON.stringify(movies[0]));
    } catch (error) {
        return new Response("Error", { status: 500 })
    }
}