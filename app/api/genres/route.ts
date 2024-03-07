import { db } from "@/firebase/config";
import { collection, query, where, limit, getDocs } from "firebase/firestore";

export async function GET() {
    try {
        const genreCollection = collection(db, "genres")
        const q = query(genreCollection, limit(30))
        const data = await getDocs(q)
        const genres = data.docs.map((doc) => {
            const genreData = doc.data();
            genreData.id = doc.id;
            return genreData;
        });
        return new Response(JSON.stringify(genres));
    } catch (error) {
        return new Response("Error", { status: 500 })
    }
}