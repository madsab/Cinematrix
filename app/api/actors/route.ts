import { db } from "@/firebase/config";
import { collection, query, where, limit, getDocs } from "firebase/firestore";

export async function GET() {
    try {
        const actorCollection = collection(db, "actors")
        const q = query(actorCollection, limit(30))
        const data = await getDocs(q)
        const actors = data.docs.map((doc) => {
            const actorData = doc.data();
            actorData.id = doc.id;
            return actorData;
        });
        return new Response(JSON.stringify(actors));
    } catch (error) {
        return new Response("Error", { status: 500 })
    }
}