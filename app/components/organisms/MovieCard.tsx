import { Icon } from "@iconify/react/dist/iconify.js";
import Image, { StaticImageData } from "next/image";
import { FC, useState } from "react";
import cn from "classnames";
import { useRouter } from "next/navigation";

export interface MovieCardProps {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  rating: 1 | 2 | 3 | 4 | 5;
  actors?: string[];
  openRating?: () => void;
}

const MovieCard: FC<MovieCardProps> = ({ openRating, ...props }) => {
  const router = useRouter();
  const [seen, setSeen] = useState(false);
  const eye = seen ? "tabler:eye" : "tabler:eye-off";
  const markAsSeen = () => {
    setSeen(!seen);
  };

  return (
    <div className="flex flex-col items-center w-[150px] space-y-2 ">
      <Image
        onClick={() => router.push(`/movies/${props.id}`)}
        src={props.image}
        alt={props.title}
        className="rounded-md hover:cursor-pointer hover:scale-105 transition-transform"
        width={150}
        height={150}
      />
      <div className="w-full flex items-center justify-between px-3">
        <Icon
          onClick={() => markAsSeen()}
          icon={eye}
          width={20}
          height={20}
          className={cn(
            "hover:cursor-pointer ease-linear duration-100 rounded-md",
            seen ? "bg-slate-600 text-black" : "text-slate-600"
          )}
        />
        <div
          className="flex items-center space-x-1 hover:cursor-pointer hover:bg-slate-600 px-1 rounded-md"
          onClick={openRating}
        >
          <p className="text-sm ">{props.rating}</p>
          <Icon icon={"tabler:star"} className=" text-yellow-200" />
        </div>
      </div>
      <p className=" text-center text-wrap italic">{props.title}</p>
    </div>
  );
};

export default MovieCard;
