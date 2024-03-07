
import React, {useEffect, useRef, useState} from "react";
import {Actor} from "@/app/types/Actor";


interface DropDownMenuProps {
    actors: Actor[];
    Title: string
    // Define any props that the DropDownMenu component might receive
    // For example, you might want to pass options or handle selection events
}

const DropDownMenu: React.FC<DropDownMenuProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const ButtonText = isOpen ? `${props.Title}  ^` : `${props.Title}  v`;
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item: string) => {
        // Handle the selected item, you can pass it to a parent component or perform any other action
        console.log(`Selected: ${item}`);
        // Close the dropdown after selecting an item
        setIsOpen(false);
    };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Click occurred outside the dropdown, close it
        setIsOpen(false);
      }
    };

    // Add click event listener to the document
    document.addEventListener("click", handleClickOutside);

    return () => {
      // Remove the click event listener when the component is unmounted
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


    return (
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle"
                    style = {{
                      border: "1px solid #FFF",
                      padding: "8px 20px",
                      borderRadius: "5px",
                      backgroundImage: "linear-gradient(to right, #000000 , #510A32)",
                    }}>
                        {ButtonText}

            </button>

            {isOpen && (
                <div className="dropdown-menu" style={{
                  // position: "absolute",
                  // top: "19%",
                  backgroundImage: "linear-gradient(to right, #000000 , #510A32)",
                  marginBottom: "7px",
                }}>
                  <div onClick={() => handleItemClick("Action")}>Action</div>
                  <div onClick={() => handleItemClick("Another action")}>Another action</div>
                  <div onClick={() => handleItemClick("Something else")}>Something else</div>
                  <div onClick={() => handleItemClick("Something else2")}>Something else2</div>
                </div>
            )}
        </div>
    );
};

export default DropDownMenu;