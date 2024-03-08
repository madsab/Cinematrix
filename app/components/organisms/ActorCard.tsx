import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import cn from "classnames";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Actor } from "@/app/types/Actor";


export interface ActorCardProps {
    actor: Actor;
  }
  
const ActorCard: FC<ActorCardProps> = ({
    actor,
}) => {
  const router = useRouter();

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
          icon={"tabler:heart"}
          width={20}
          height={20}
          className={cn(
            "hover:cursor-pointer ease-linear duration-100 rounded-md bg-white text-black"
          )}
        />
      </div>
    </div>
  );
};

export default ActorCard;
