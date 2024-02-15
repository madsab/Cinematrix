import { FC, useEffect, useState } from "react";
import cn from "classnames";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  type?: "default" | "confirm" | "cancel";
}
const Button: FC<ButtonProps> = ({ ...props }) => {
  const [style, setStyle] = useState("");

  useEffect(() => {
    switch (props.type) {
      case "confirm":
        setStyle("bg-green-200 text-green-500");
        break;
      case "cancel":
        setStyle("bg-red-200 text-red-500");
        break;
      default: {
        setStyle("bg-purple-700 text-white");
        break;
      }
    }
  }, [props.type]);
  return (
    <button
      onClick={props.onClick}
      className={cn("p-2 rounded-md", style, props.className)}
    >
      {props.children}
    </button>
  );
};

export default Button;
