import { db } from "@/firebase/config";
import { collection, query, where, limit, getDocs } from "firebase/firestore";

export async function GET() {
    try {
        const sponsCollection = collection(db, "sponsored")
        const q = query(sponsCollection)
        const data = await getDocs(q)
        const sponsored = data.docs.map((doc) => {
            const sponsData = doc.data();
            sponsData.id = doc.id;
            return sponsData;
        });
        return new Response(JSON.stringify(sponsored));
    } catch (error) {
        return new Response("Error", { status: 500 })
    }
}