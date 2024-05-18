// Home/WinCard/WinCard.tsx
import Image from "next/image";
import React from "react";

interface WinCardProps {
  profileImage: string;
  userName: string;
  amountWon: number;
  gamePlayed: string;
}

const WinCard: React.FC<WinCardProps> = ({
  profileImage,
  userName,
  amountWon,
  gamePlayed,
}) => {
  return (
    <div
      className="flex flex-col bg-slate-800 border border-b-gold rounded-xl w-win-card h-44 p-3 mb-10
        transition-transform duration-250 ease-in-out delay-100 hover:translate-y-[-5px] hover:translate-x-[5px]"
    >
      <div className="flex items-center mb-1 text-neutral-200">
        <Image
          src={profileImage}
          alt="Profile"
          width={50}
          height={50}
          className="mr-2 rounded-full"
        />
        <p className="text-[20px] font-extrabold">{userName}</p>
      </div>
      <div className="flex justify-between text-neutral-400 mt-auto mb-1">
        <p className="text-[16px]">Payout: ${amountWon}</p>
        <p className="text-[16px]">Game: {gamePlayed}</p>
      </div>
    </div>
  );
};

export default WinCard;
