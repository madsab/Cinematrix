
import React, {useEffect, useRef, useState} from "react";
import {Actor} from "@/app/types/Actor";


interface DropDownMenuProps {
    actors: Actor[];
    Title: string
}

const DropDownMenu: React.FC<DropDownMenuProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const ButtonText = isOpen ? `${props.Title}  ^` : `${props.Title}  v`;
    const refDropdown = useRef<any>(null);
    const refButton = useRef<any>(null);

    const toggleDropdown = () => {
        console.log(`Nå ble selve knappen trykket ${props.Title}`)
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item: string) => {
        console.log(`Selected: ${item}`);
        setIsOpen(false);
    };



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(refDropdown.current)
      console.log("HandleClickoutside kjører")
      if (isOpen && refDropdown.current && !refDropdown.current.contains(event.target) && !refButton.current.contains(event.target)) {
        console.log(refDropdown.current)
        console.log("Funker som forventet")
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [refDropdown, isOpen]);


    return (
        <div className="dropdown ">
            <button ref = {refButton} onClick={toggleDropdown} className="dropdown-toggle px-4 py-3 text-Button"
                    style = {{
                      border: "1px solid #FFF",
                      borderRadius: "5px",
                      backgroundImage: "linear-gradient(to right, #000000 , #510A32)",
                    }}>
                        {ButtonText}
            </button>

            {isOpen && (
                <div ref = {refDropdown} className="dropdown-menu mt-2" style={{
                  position: "absolute",
                  zIndex: "1",
                  backgroundImage: "linear-gradient(to right, #000000 , #510A32)",
                  border: "2px solid #FFF",
                  cursor: "pointer",
                }} >
                  <div className = "hover:bg-white hover:text-night p-1.5" onClick={() => handleItemClick("Action")}>Action</div>
                  <div className = "hover:bg-white hover:text-night p-1.5" onClick={() => handleItemClick("Another action")}>Another action</div>
                  <div className = "hover:bg-white hover:text-night p-1.5" onClick={() => handleItemClick("Something else")}>Something else</div>
                  <div className = "hover:bg-white hover:text-night p-1.5" onClick={() => handleItemClick("Something else2")}>Something else2</div>
                </div>
            )}
        </div>
    );
};

export default DropDownMenu;