import React, {useState} from "react";
import {Icon} from "@iconify/react";


interface ButtonSortProps {
    title: string;
    droppedDown: boolean;
    setDroppedDown: any;
    toogled: boolean;
    useDot: boolean // Sett denne til true om du vil ha funksjonaliteten brukt i /browse på name og rating
}

const ButtonSort: React.FC<ButtonSortProps> = (props) => {
    const icon = props.droppedDown ?  "tabler:arrow-down"  :  "tabler:arrow-up";
    const [isDroppedDown, setDroppedDown] = useState(props.droppedDown)
    const icon2 = props.toogled && props.useDot ?  "tabler:circle-dot"  :  "";

    const toogleIsOpen = () => {
      setDroppedDown(!isDroppedDown);
      console.log( props.droppedDown)
        props.setDroppedDown(!props.droppedDown)
     }

  return (
      <main>
        <button onClick={toogleIsOpen}
                className="text-Button w-40 justify-between items-center px-4 py-3 flex border-white border-solid border-2 bg-gradient-to-r from-black to-grape"
                style={{
                  borderRadius: "5px",
                }}>
          {props.title}
          <Icon icon={icon2}>

          </Icon>
          <Icon icon={icon}>

          </Icon>
        </button>
      </main>
  );


}


export default ButtonSort;