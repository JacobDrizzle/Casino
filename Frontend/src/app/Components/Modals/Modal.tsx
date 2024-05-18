import React from 'react';

interface WinningModalProps {
    isOpen: boolean;
    onClose: () => void;
    payout: number;
}

const WinningModal: React.FC<WinningModalProps> = ({ isOpen, onClose, payout }) => {
    if (!isOpen) return null;
    console.log("Payout Modal open: ", isOpen);
    return (
      <div className="fixed z-99 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-slate-800 border border-borderGold rounded-xl p-5 w-[420px]">
        <span 
          className="absolute top-2 right-2 text-gray-400 text-2xl font-bold cursor-pointer hover:text-black"
          onClick={onClose}
        >
          &times;
        </span>
        <div className="text-center p-10 text-white">
          <p>Congratulations! You won {payout} points!</p>
        </div>
      </div>
    </div>
    );
};

export default WinningModal;