import cn from "classnames";
import { FC, useEffect, useRef, useState } from "react";
import Button from "../atoms/Button";

interface PopUpProps {
  children: React.ReactNode;
  className?: string;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const PopUp: FC<PopUpProps> = ({
  children,
  className,
  open,
  onCancel,
  onConfirm,
}) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(event.target)) {
        onCancel();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, open, onCancel]);

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
        <Button onClick={onCancel} type="cancel">
          Cancel
        </Button>
        <Button onClick={onConfirm} type="confirm">
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default PopUp;
