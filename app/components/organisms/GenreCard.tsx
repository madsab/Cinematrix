import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Genre from "../../assets/images/genre.png";
import cn from "classnames";
import { useRouter } from "next/navigation";
import { FC } from "react";


export interface GenreCardProps {
    genre: string;
  }
  
const GenreCard: FC<GenreCardProps> = ({
    genre,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center w-[150px] h-fit space-y-2 ">
      <Image
        onClick={() => router.push(`/genres/${genre}`)}
        src={Genre}
        alt={genre}
        width={150}
        height={200}
        className="rounded-md hover:cursor-pointer hover:scale-105 transition-transform"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <div className="w-full flex items-center justify-between px-3">
        <Icon
          icon={"tabler:heart"}
          width={20}
          height={20}
          className={cn(
            "hover:cursor-pointer ease-linear duration-100 rounded-md bg-white text-black"
          )}
        />
        <p className=" text-center text-wrap italic">{genre}</p>

      </div>
    </div>
  );
};

export default GenreCard;
