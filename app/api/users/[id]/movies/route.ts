import { db } from "@/firebase/config";
import { QueryFieldFilterConstraint, arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, QueryLimitConstraint } from "firebase/firestore";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest, params: {params: { id: string }}) {
    const { filter = null, limit = null } = await req.json()
    const res = collection(db, "users", params.params.id)
    let q = null

    try {
        if (filter && limit){
                q = query(res, filter as QueryFieldFilterConstraint , limit as QueryLimitConstraint)
        } else if (filter && !limit) {
                q = query(res, filter as QueryFieldFilterConstraint)
        } else if (!filter && limit){
                q = query(res, limit as QueryLimitConstraint)
        } else {
                q = query(res)
        }
        const data = await getDocs(q)
        const movies = data.docs.map((doc) => {
            const movieData = doc.data();
            movieData.id = doc.id;
            return movieData;
        });
        return new Response(JSON.stringify(movies));
    } catch (error) {
        return new Response("Error", {status: 500})
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

