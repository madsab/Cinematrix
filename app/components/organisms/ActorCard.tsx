import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import cn from "classnames";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Actor } from "@/app/types/Actor";
import { auth } from "@/firebase/config";


export interface ActorCardProps {
    actor: Actor;
    liked?: boolean;
  }
  
const ActorCard: FC<ActorCardProps> = ({
    actor,
    liked = false
}) => {
  const router = useRouter();
  const userId = auth.currentUser?.uid;

  const [isLiked, setLiked] = useState(false);
  const heart = isLiked ? "tabler:heart" : "tabler:heart-off";

  const markAsLiked = () => {
    let method = !isLiked ? "POST" : "DELETE";
    saveToDb(method);
    setLiked(!isLiked);
  };

  const saveToDb = async (method: string) => {
    if (actor.Directed.length > 0) {
      await fetch(`/api/users/${userId}/actors?fieldType=directorsLiked`, {
        method: method,
        body: JSON.stringify({ actorID: actor.id }),
      });
    }

    if (actor.ActedIn.length > 0) {
      await fetch(`/api/users/${userId}/actors?fieldType=actorsLiked`, {
        method: method,
        body: JSON.stringify({ actorID: actor.id }),
      });
    }

  };


  useEffect(() => {
    liked && setLiked(true);
  }, [liked]);

  /*
  const saveToDb = async (method: string) => {
    await fetch(`/api/users/${userId}/movies?fieldType=Watched`, {
      method: method,
      body: JSON.stringify({ movieImdbId: movie.imdbid }),
    });
  };
  */

  return (
    <div className="flex flex-col items-center w-[150px] h-fit space-y-2 ">
      <div className="overflow-hidden w-[150px] h-[222px] rounded-md hover:scale-105 transition-transform">
      <Image
        onClick={() => router.push(`/actors/${actor.id}`)}
        src={actor.image}
        alt={actor.name}
        width={150}
        height={200}
        className="hover:cursor-pointer hover:scale-191 transition-transform"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      </div>
      
      <div className="w-full flex items-center justify-between px-3">
        <p className=" text-wrap italic">{actor.name}</p>

        <Icon
          icon={heart}
          width={20}
          height={20}
          onClick={() => markAsLiked()}
          className={cn(
            "hover:cursor-pointer ease-linear duration-100 rounded-md",
            isLiked ? "bg-white text-black" : "text-white"
          )}
        />
      </div>
    </div>
  );
};

export default ActorCard;
