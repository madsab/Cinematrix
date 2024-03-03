import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/firebase/config";
import { collection, query, where, limit, getDocs, or, and } from "firebase/firestore";

export async function GET(req: NextRequest) {
    const type = req.nextUrl.searchParams.get('type') as string;
    const sw = req.nextUrl.searchParams.get('sw') as string;
    const swClean = sw.toLowerCase().replace(/[^a-zA-Z]/g, '');
    console.log(swClean);

    try {
        if (type == "movies") {
            const collectionType = collection(db, "movies")
            const q = query(collectionType,
                where("title", ">=", sw),
                where("title", "<=", sw+"\uf8ff"),
            limit(15));

            const data = await getDocs(q)

            const movies = data.docs.map((doc) => {
                const movieData = doc.data();
                movieData.id = doc.id;
                return movieData;
            });
            return new Response(JSON.stringify(movies));

        } else if (type == "genres") {
            const collectionType = collection(db, "genres")
            const q = query(collectionType,
                where("sw", ">=", swClean.toLowerCase()),
                where("sw", "<=", swClean.toLowerCase()+"\uf8ff"),
            limit(15));

            const data = await getDocs(q)

            const genres = data.docs.map((doc) => {
                return doc.id;
            });

            return new Response(JSON.stringify(genres));

        } else if (type == "actors") {
            const collectionType = collection(db, "actors")
            const q = query(collectionType,
                where("sw", ">=", swClean),
                where("sw", "<=", swClean+"\uf8ff"),
            limit(15));

            const data = await getDocs(q)

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