import { Icon } from "@iconify/react/dist/iconify.js";
import React, { FC, useEffect, useState } from "react";
import cn from "classnames";

interface StarsProps {
  rating?: 1 | 2 | 3 | 4 | 5;
}

const Stars: FC<StarsProps> = ({ rating }) => {
  const size = 30;
  const [originalRating, setOriginalRating] = useState(0); // Todo replace with actual rating
  const [currentRating, setCurrentRating] = useState(0);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    rating && setOriginalRating(rating);
  }, [rating]);

  const handleStarHover = (starIndex: number) => {
    setCurrentRating(starIndex + 1);
  };

  const handleStarLeave = () => {
    clicked ? setCurrentRating(currentRating) : setCurrentRating(0);
  };

  return (
    <div className="flex items-center hover:cursor-pointer">
      {[...Array(5)].map((_, index) => (
        <Icon
          key={index}
          icon={"tabler:star"}
          width={size}
          height={size}
          onClick={() => {
            setOriginalRating(index + 1);
          }}
          onMouseEnter={() => handleStarHover(index)}
          onMouseLeave={handleStarLeave}
          className={cn(
            index < currentRating || index < originalRating
              ? " fill-yellow-200  text-yellow-300"
              : " text-gray-500"
          )}
        />
      ))}
    </div>
  );
};

export default Stars;
