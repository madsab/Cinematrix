import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/firebase/config";
import { collection, query, where, limit, getDocs, or, and } from "firebase/firestore";

export async function GET(req: NextRequest) {
    try {
        const sw = req.nextUrl.searchParams.get('sw') as string;

        const movieCollection = collection(db, "movies")
        const q = query(movieCollection, or(
            where("title", "==", sw), 
            where("genre", "array-contains-any", [sw]),
            ), 
            limit(15))
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