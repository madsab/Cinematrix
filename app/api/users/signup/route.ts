import { db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { NextApiResponse } from "next";

export async function POST(req: Request, res: NextApiResponse) {
    const { userId } = await req.json()
    await setDoc(doc(db, "users", userId), {
        seenMovies: [],
        ratedMovies: []

    })
    return res.status(200)
}