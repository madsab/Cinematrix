import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import cn from "classnames";

const Badge = (): React.ReactNode => {
  const [isWatched, setisWatched] = useState(false);
  const handleClick = () => {
    setisWatched(!isWatched);
  };
  return (
    <button
      className={cn(
        "flex items-center space-x-2 border-[1px] px-9 py-1 rounded-full",
        isWatched
          ? "bg-green-100 border-green-400 text-green-500"
          : "bg-red-100 border-red-400 text-red-500"
      )}
      onClick={handleClick}
    >
      <Icon
        icon={isWatched ? "tabler:eye" : "tabler:eye-off"}
        className={cn(isWatched ? "text-green-500" : "text-red-500")}
      />
      <span>
        {isWatched
          ? "You have seen this movie"
          : "You have not seen this movie"}
      </span>
    </button>
  );
};

export default Badge;
