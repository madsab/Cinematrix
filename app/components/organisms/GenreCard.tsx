import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import GenreImg from "../../assets/images/genres.png";
import cn from "classnames";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Genre } from "@/app/types/Genre";


export interface GenreCardProps {
    genre: Genre;
  }
  
const GenreCard: FC<GenreCardProps> = ({
    genre,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center w-[150px] h-fit space-y-2">
      <div className="relative rounded-md hover:cursor-pointer hover:scale-105 transition-transform group"
              onClick={() => router.push(`/genres/${genre.id}`)}
    >
      <Image
        src={GenreImg}
        alt={genre.id}
        width={150}
        height={200}
        className="rounded-md hover:cursor-pointer"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <Icon
          icon={genre.icon}
          width={125}
          height={125}
          className="absolute text-5xl text-center text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform"
        />
      </div>
      
      <div className="w-full flex items-center justify-between px-3">
        <p className="text-wrap italic">{genre.id}</p>

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

export default GenreCard;
