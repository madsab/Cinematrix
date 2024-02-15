import cn from "classnames";
import { FC, useEffect, useRef, useState } from "react";
import Button from "../atoms/Button";

interface PopUpProps {
  children: React.ReactNode;
  className?: string;
  open: boolean;
  onClose: () => void;
}

const PopUp: FC<PopUpProps> = ({ children, className, open, onClose }) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(event.target)) {
        onClose();
        console.log("click outside");
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, open, onClose]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute flex flex-col items-center p-6 rounded-md z-50 bg-black border-2 border-slate-900 shadow-md",
        className
          ? className
          : "w-full top-1/4 sm:w-1/2 sm:left-1/4 sm:top-1/4",
        !open && "hidden"
      )}
    >
      {children}
      <div className="w-full flex justify-end space-x-3">
        <Button onClick={onClose} type="cancel">
          Cancel
        </Button>
        <Button onClick={onClose} type="confirm">
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default PopUp;
