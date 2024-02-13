import cn from "classnames";
import React, { FC, PropsWithChildren } from "react";

interface PopUpProps {
  children: React.ReactNode;
  className?: string;
}

const PopUp: FC<PopUpProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "absolute w-1/2 flex flex-col items-center p-6 rounded-md z-50 bg-slate-600",
        className
      )}
    >
      {children}
      <div className="w-full flex justify-end">
        {/* Insert button component here */}
        <button className="bg-purple-700 p-2 rounded-md">
          Instert Button here
        </button>
      </div>
    </div>
  );
};

export default PopUp;
