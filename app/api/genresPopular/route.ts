import { db } from "@/firebase/config";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const type= req.nextUrl.searchParams.get('genre') as string;
    try {
        const movieCollection = collection(db, "movies")
        const q = query(movieCollection, where("genre", "array-contains", type), limit(30))
        const data = await getDocs(q)
        const movies = data.docs.map((doc) => {
            const movieData = doc.data();
            movieData.id = doc.id;
            return movieData;
        });
        return new Response(JSON.stringify(movies));
    } catch (error) {
        return new Response("Error", { status: 500 })
    }
}