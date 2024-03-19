import { db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { NextApiResponse } from "next";

export async function POST(req: Request, res: NextApiResponse) {
    const { userId } = await req.json()
    await setDoc(doc(db, "users", userId), {
        moviesWatched: [],
        moviesRated: [],
        moviesLiked: [],
        genresLiked: [],
        actorsLiked: [],
        directorsLiked: []

    })
    return res.status(200)
}