import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/firebase/config";
import { collection, query, where, limit, getDocs, or, and } from "firebase/firestore";

export async function GET(req: NextRequest) {
    try {
        const sw = req.nextUrl.searchParams.get('sw') as string;

        const movieCollection = collection(db, "movies")

        //Could not combine the two queries with neither and or ors,
        //So I made them seperate

        const q1 = query(movieCollection,
            where("title", ">=", sw),
            where("title", "<=", sw+"\uf8ff"),
        limit(15));

        const q2 = query(movieCollection,
            where("genre", "array-contains-any", sw.split(",")),
        limit(15));

        const q1data = await getDocs(q1)
        const q2data = await getDocs(q2)
        const data = q1data.docs.concat(q2data.docs)

        const movies = data.map((doc) => {
            const movieData = doc.data();
            movieData.id = doc.id;
            return movieData;
        });
        return new Response(JSON.stringify(movies));
    } catch (error) {
        return new Response("Error", { status: 500 })
    }
}