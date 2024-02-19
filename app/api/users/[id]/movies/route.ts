import { db } from "@/firebase/config";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";


export async function GET() {
    try {
        const res = collection(db, "movies")
        const q = query(res, where("year", ">=", 2010), limit(20))
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

export async function POST(req: NextRequest) {
    return new Response(req.body)
}