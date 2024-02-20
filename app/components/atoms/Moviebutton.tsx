import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Badge() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <button
      className={`flex items-start border border-[#CDDBC9] bg-[#CDDBC9] rounded-md px-2 py-1 ${
        clicked ? "text-[#AD480F]" : "text-[#37A81B]"
      } hover:bg-[#CDDBC9] hover:scale-105 transform transition-all duration-150 ease-in-out`}
      onClick={handleClick}
    >
      <Icon
        icon={clicked ? "tabler:eye-off" : "tabler:eye"}
        className="icon mr-1 mt-[3.5px] text-xl"
        color={clicked ? "#AD480F" : "#37A81B"}
      />
      <span>
        {clicked ? "Remove from watched movies" : "Add to watched movies"}
      </span>
    </button>
  );
}
