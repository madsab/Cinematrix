import React, { FC } from 'react';

interface TopMovieBadgeProps {
  rank: number;
}

const TopMovieBadge: FC<TopMovieBadgeProps> = ({ rank }) => {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 flex items-center justify-center bg-black bg-opacity-75 rounded-full border-4 border-white">
    <span className="text-white text-4xl font-bold">{rank}</span>
  </div>
  );
};

export default TopMovieBadge;