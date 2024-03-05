import { db } from "@/firebase/config";
import { collection, query, where, limit, getDocs } from "firebase/firestore";

export async function GET() {
    try {
        const movieCollection = collection(db, "movies")
        const q = query(movieCollection, where("genre", "array-contains", "Bad"), limit(30))
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