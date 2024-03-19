import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Genre } from "@/app/types/Genre";

interface DropDownMenuProps {
  genres: Genre[];
  Title: string;
  current: string;
  setCurrent: any;
}

const DropDownMenu: React.FC<DropDownMenuProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ButtonText, setButtonText] = useState<string>(props.Title);
  const refDropdown = useRef<any>(null);
  const refButton = useRef<any>(null);
  const icon = isOpen ? "tabler:arrow-big-up-filled" : "tabler:arrow-big-down";
  const [resetFilter, setResetFilter] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    if (item != props.Title) {
      setResetFilter(true);
      props.setCurrent(item);
    } else {
      setResetFilter(false);
      props.setCurrent("");
    }
    console.log(`Selected: ${item}`);
    setButtonText(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        refDropdown.current &&
        !refDropdown.current.contains(event.target) &&
        !refButton.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [refDropdown, isOpen]);

  return (
    <div className="dropdown mr-16">
      <button
        ref={refButton}
        onClick={toggleDropdown}
        className="dropdown-toggle px-4 py-3 text-Button flex justify-between items-center  gap-3 w-44  bg-gradient-to-r from-black to-grape"
        style={{
          border: "2px solid #FFF",
          borderRadius: "5px",
        }}
      >
        <div>{ButtonText}</div>
        <Icon icon={icon}></Icon>
      </button>

      {isOpen && (
        <div
          ref={refDropdown}
          className="dropdown-menu mt-2  w-44 bg-gradient-to-r from-black to-grape "
          style={{
            position: "absolute",
            zIndex: "1",
            border: "2px solid #FFF",
            cursor: "pointer",
          }}
        >
          {resetFilter && (
            <div
              className="hover:bg-white hover:text-night p-2.5 border-white border-solid border-b-2 italic"
              onClick={() => handleItemClick(props.Title)}
            >
              Reset Filter
            </div>
          )}
          {props.genres.map((genre, key) => (
            <div
              key={key}
              className="hover:bg-white hover:text-night p-2.5"
              onClick={() => handleItemClick(genre.id)}
            >
              {genre.id}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
