import { db } from "@/firebase/config";
import { arrayRemove, arrayUnion, collection, doc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { NextApiResponse } from "next";
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

export async function POST(req: NextRequest, params: {params: { id: string }}, res: NextApiResponse) {
    const { movieImdbId  } = await req.json()
    const userDoc = doc(db, "users", params.params.id)
    await updateDoc(userDoc, {
        moviesWatched: arrayUnion(movieImdbId),
    })
    return res.status(201)
}

export async function DELETE(req: NextRequest, params: {params: { id: string }}, res: NextApiResponse) {
    const { movieImdbId  } = await req.json()
    const userDoc = doc(db, "users", params.params.id)
    await updateDoc(userDoc, {
        moviesWatched: arrayRemove(movieImdbId),
    })
    return res.status(200)
}

