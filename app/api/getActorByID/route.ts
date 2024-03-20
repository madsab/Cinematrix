import { db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") as string;
  try {
    const actorCollection = collection(db, "actors");
    const q = query(actorCollection, where("actorID", "==", id));
    const data = await getDocs(q);
    const actors = data.docs.map((doc) => {
      const actorData = doc.data();
      actorData.id = doc.id;
      return actorData;
    });
    return new Response(JSON.stringify(actors[0]));
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
