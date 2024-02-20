import { Icon } from "@iconify/react/dist/iconify.js";
import "../atoms/Badge.css";
import { useState } from "react";

const Badge = (): React.ReactNode => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <button
      className={`hasSeen ${clicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      <Icon
        icon={clicked ? "tabler:eye-off" : "tabler:eye"}
        color={clicked ? "#AD480F" : "#37A81B"}
        className="icon"
      />
      <span>
        {clicked ? "Remove from watched movies" : "Add to watched movies"}
      </span>
    </button>
  );
};

export default Badge;
