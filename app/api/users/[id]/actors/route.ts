import { db } from "@/firebase/config";
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where, getDoc, setDoc } from "firebase/firestore";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

type type = "ID" | null
type genreID = string | null
type fieldType = "directorsLiked" | "actorsLiked" | null


export async function GET(req: NextRequest, params: {params: { id: string }}) {
    const fieldType = req.nextUrl.searchParams.get("fieldType") as fieldType 
    const type = req.nextUrl.searchParams.get("type") as type 
    const actorID = req.nextUrl.searchParams.get("genreID") as genreID 
    const userID = params.params.id

    const userDB = doc(db, "users", userID)
    const actorDB = collection(db, "actors")

    try{
        if (userID === "null" || !userID){
            return new Response(JSON.stringify({message: "Missing valid user, got: ", userID }), {status: 500})
        }
        if (fieldType == null || !fieldType) {
            return new Response(JSON.stringify({message: "Missing valid fieldType, got: ", fieldType }), {status: 500})
        }

        const actorsLiked = (await getDoc(userDB)).get(fieldType) as []

        if (type === "ID") {
            return new Response(JSON.stringify(actorsLiked))
        }

        if (actorID !== null) {
            const data = (await getDoc(doc(userDB, actorID)))
            const actor = data.data()
            if (actor){
                actor.id = data.id
            } else {
                return new Response(JSON.stringify({message: "Actor not found"}), {status: 404})
            }

            return new Response(JSON.stringify(actor))
        }
        const likedActors: any[] = []

        actorsLiked.forEach((actor: string) => {
            likedActors.push(actor)
        })
        const data = await getDocs(query(actorDB, where("actorID", "in", likedActors)))

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

export async function POST(req: NextRequest, params: {params: { id: string }}) {
    const userDoc = doc(db, "users", params.params.id)
    const fieldType = req.nextUrl.searchParams.get("fieldType") as fieldType 

    const { actorID } = await req.json();

    if (fieldType == "actorsLiked") {        
        await updateDoc(userDoc, {
            actorsLiked: arrayUnion(actorID),
        })
    } else if (fieldType == "directorsLiked") {
        await updateDoc(userDoc, {
            directorsLiked: arrayUnion(actorID),
        })
    }
    return new Response(JSON.stringify({message: "Genre added to " + fieldType}), {status: 201})
}

export async function DELETE(req: NextRequest, params: {params: { id: string }}, res: NextApiResponse) {
    const { actorID } = await req.json()
    const fieldType = req.nextUrl.searchParams.get("fieldType") as fieldType 

    const userDoc = doc(db, "users", params.params.id)

    if (fieldType == "actorsLiked") {        
        await updateDoc(userDoc, {
            actorsLiked: arrayRemove(actorID),
        })
    } else if (fieldType == "directorsLiked") {
        await updateDoc(userDoc, {
            directorsLiked: arrayRemove(actorID),
        })
    }

    return new Response(JSON.stringify({message: "Deletion successful"}), {status: 200})
}

