import { db } from "@/firebase/config";
import { collection, doc, getDocs, query, where, getDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

type fieldType = "Directed" | "ActedIn" | null


export async function GET(req: NextRequest) {
    const fieldType = req.nextUrl.searchParams.get("fieldType") as fieldType 
    const movieID = req.nextUrl.searchParams.get("movieID") as string;

    const actorDB = collection(db, "actors")

    try{
        if (fieldType == null || !fieldType) {
            return new Response(JSON.stringify({message: "Missing valid fieldType, got: ", fieldType }), {status: 500})
        }

        const data = await getDocs(query(actorDB, where(fieldType, "array-contains", movieID)))

        const actors = data.docs.map((doc) => {
            const actorData = doc.data();
            actorData.id = doc.id;
            return actorData;
        });
        return new Response(JSON.stringify(actors))

    } catch (error) {
        return new Response(JSON.stringify({message: "Unexpected error: " + error }), {status: 500})
    }

}