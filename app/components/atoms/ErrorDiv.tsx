import React, { FC } from "react";

interface ErrorDivProps {
  error: string;
}

const ErrorDiv: FC<ErrorDivProps> = ({ error }) => {
  return (
    <div className="w-full flex items-center justify-center text-sm ">
      <p className="text-fire">{error}</p>
    </div>
  );
};

export default ErrorDiv;
