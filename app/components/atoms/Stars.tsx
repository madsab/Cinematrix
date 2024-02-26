import { Icon } from "@iconify/react/dist/iconify.js";
import React, {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import cn from "classnames";
import { or } from "firebase/firestore";

export interface StarsProps {
  save: boolean;
  userId: string | null;
  movieImdbId: string | undefined;
}

export type StarsRef = {
  saveToDb: () => void;
  resetRating: () => void;
};

const Stars = forwardRef<StarsRef, StarsProps>(
  ({ userId, movieImdbId }: StarsProps, ref) => {
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
      };

      userId && movieImdbId && fetchUserRating();
    }, [currentRating, userId, movieImdbId]);

    useImperativeHandle(ref, () => ({
      saveToDb,
      resetRating,
    }));

    const saveToDb = async () => {
      console.log("saveToDb Movie:", movieImdbId, " Rating:", originalRating);
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
