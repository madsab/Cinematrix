import { db } from "@/firebase/config";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const userLimit  = req.nextUrl.searchParams.get("limit")
    let q;
    try {
        const movieCollection = collection(db, "movies")
        if (userLimit){
            q = query(movieCollection, limit(parseInt(userLimit)))
        } else {
            q = query(movieCollection)
        }
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