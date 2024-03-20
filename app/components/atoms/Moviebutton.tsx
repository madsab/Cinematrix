import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

interface MovieButtonProps {
  onClick?: () => void;
  alreadyWatched?: boolean;
}

export default function MovieButton({
  onClick,
  alreadyWatched,
}: MovieButtonProps) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
    onClick && onClick();
  };

  useEffect(() => {
    alreadyWatched && setClicked(alreadyWatched);
  }, [alreadyWatched]);

  return (
    <button
      className={` w-fit flex items-center rounded-md px-2 py-1 ${
        clicked ? "text-[#37A81B] bg-[#CDDBC9]" : "text-[#892e4b] bg-[#f3ebed]"
      } hover:scale-105 transform transition-all duration-150 ease-in-out`}
      onClick={handleClick}
    >
      <Icon
        icon={clicked ? "tabler:check" : "tabler:plus"}
        className="icon mr-1 text-xl"
        color={clicked ? "#37A81B" : "#892e4b"}
      />
      <span>
        {clicked ? "You've watched this movie" : "Add to Watchedlist"}
      </span>
    </button>
  );
}
