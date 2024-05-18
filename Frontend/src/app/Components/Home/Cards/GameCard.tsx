// Components/Home/Cards/GameCard.tsx
import React from "react";
import Image from "next/image";

interface GameCardProps {
  imageUrl: string;
  gameName: string;
}

const GameCard: React.FC<GameCardProps> = ({ imageUrl, gameName }) => {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-b-gold shadow-md group"
      title={gameName}
    >
      <a href="/">
        <Image
          src={imageUrl}
          alt={gameName}
          width={150}
          height={300}
          className="transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        <div className="absolute bottom-0 left-0 w-full p-1 bg-[rgba(0,0,0,0.9)] text-white text-center text-sm opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
          {gameName}
        </div>
      </a>
    </div>
  );
};

export default GameCard;
