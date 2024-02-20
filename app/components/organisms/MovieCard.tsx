import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import cn from "classnames";
import { useRouter } from "next/navigation";
import { Movie } from "@/app/types/Movie";
import { auth } from "@/firebase/config";

export interface MovieCardProps {
  movie: Movie;
  alreadyWatched?: boolean;
  openRating?: () => void;
}

const MovieCard: FC<MovieCardProps> = ({
  openRating,
  movie,
  alreadyWatched = false,
}) => {
  const router = useRouter();
  const userId = auth.currentUser?.uid;
  const [isWatched, setWatched] = useState(false);
  const eye = isWatched ? "tabler:eye" : "tabler:eye-off";
  const markAsWatched = () => {
    let method = !isWatched ? "POST" : "DELETE";
    saveToDb(method);
    setWatched(!isWatched);
  };

  useEffect(() => {
    alreadyWatched && setWatched(true);
  }, [alreadyWatched]);

  const saveToDb = async (method: string) => {
    await fetch(`/api/users/${userId}/movies`, {
      method: method,
      body: JSON.stringify({movieImdbId: movie.imdbid}),
    });
  };

  return (
    <div className="flex flex-col items-center w-[150px] h-fit space-y-2 ">
      <Image
        onClick={() => router.push(`/movies/${movie.imdbid}`)}
        src={movie.image}
        alt={movie.title}
        className="rounded-md hover:cursor-pointer hover:scale-105 transition-transform"
        width={150}
        height={150}
      />
      <div className="w-full flex items-center justify-between px-3">
        <Icon
          onClick={() => markAsWatched()}
          icon={eye}
          width={20}
          height={20}
          className={cn(
            "hover:cursor-pointer ease-linear duration-100 rounded-md",
            isWatched ? "bg-slate-600 text-black" : "text-slate-600"
          )}
        />
        <div
          className="flex items-center space-x-1 hover:cursor-pointer hover:bg-slate-600 px-1 rounded-md"
          onClick={openRating}
        >
          <p className="text-sm ">{movie.rating}</p>
          <Icon icon={"tabler:star"} className=" text-yellow-200" />
        </div>
      </div>
      <p className=" text-center text-wrap italic">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
