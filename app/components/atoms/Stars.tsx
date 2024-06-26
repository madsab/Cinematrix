import { Icon } from "@iconify/react/dist/iconify.js";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import cn from "classnames";

export interface StarsProps {
  userId: string | null;
  movieImdbId: string | undefined;
  onClick?: () => void;
}

export type StarsRef = {
  saveToDb: () => void;
  resetRating: () => void;
};

const Stars = forwardRef<StarsRef, StarsProps>(
  ({ userId, movieImdbId, onClick }: StarsProps, ref) => {
    const size = 30;
    const [originalRating, setOriginalRating] = useState(0); // Todo replace with actual rating
    const [currentRating, setCurrentRating] = useState(0);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
      const fetchUserRating = async () => {
        const res = await fetch(
          `/api/users/${userId}/movies?fieldType=Rated&movieID=${movieImdbId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setCurrentRating(data);
        setOriginalRating(data);
      };
      resetRating();
      userId && movieImdbId && fetchUserRating();
    }, [userId, movieImdbId]);

    useImperativeHandle(ref, () => ({
      saveToDb,
      resetRating,
    }));

    const saveToDb = async () => {
      if (originalRating != 0) {
        await fetch(`/api/users/${userId}/movies?fieldType=Rated`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieImdbId: movieImdbId,
            rating: originalRating,
          }),
        });
      }
    };

    const resetRating = () => {
      setCurrentRating(0);
    };
    const handleStarHover = (starIndex: number) => {
      setCurrentRating(starIndex + 1);
    };

    const handleStarLeave = () => {
      clicked ? setCurrentRating(currentRating) : setCurrentRating(0);
    };

    return (
      <div className="flex items-center hover:cursor-pointer">
        {[...Array(10)].map((_, index) => (
          <Icon
            key={index}
            icon={"tabler:star"}
            width={size}
            height={size}
            onClick={() => {
              setOriginalRating(index + 1);
              onClick && onClick();
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
  }
);

Stars.displayName = "Stars";

export default Stars;
