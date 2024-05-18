import React from "react";
import { GiMoneyStack } from "react-icons/gi";

const IconCard = () => {
  return (
    <div className="h-[45px] w-[45px] mt-[10px] border border-b-gold rounded-md bg-[rgba(255,255,255,0.1)]">
      <div className="transition-opacity duration-500 ease-in-out">
        <div className="relative ml-[5px] mt-[2px]">
          <div className="absolute top-1">
            <GiMoneyStack size={"2rem"} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default IconCard;
