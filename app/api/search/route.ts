import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/firebase/config";
import { collection, query, where, limit, getDocs, or, and, Query } from "firebase/firestore";

export async function GET(req: NextRequest) {
    const type = req.nextUrl.searchParams.get('type') as string;
    const sw = (req.nextUrl.searchParams.get('sw') as string).toLowerCase().replace(/[^a-zA-Z]/g, '');

    try {
        const collectionType = collection(db, type)
        const q = query(collectionType,
            where("sw", ">=", sw),
            where("sw", "<=", sw+"\uf8ff"),
        limit(15));
        const data = await getDocs(q);

        if (type == "movies") {
            const movies = data.docs.map((doc) => {
                const movieData = doc.data();
                movieData.id = doc.id;
                return movieData;
            });
            return new Response(JSON.stringify(movies));

        } else if (type == "genres") {
            const genres = data.docs.map((doc) => {
                const genreData = doc.data();
                genreData.id = doc.id;
                return genreData;
            });

            return new Response(JSON.stringify(genres));

        } else if (type == "actors") {

            const actors = data.docs.map((doc) => {
                const actorData = doc.data();
                actorData.id = doc.id;
                return actorData;
            });
            return new Response(JSON.stringify(actors));
        }

    } catch (error) {
        return new Response("Error", { status: 500 })
    }
}