// Components/Buttons/CloseButton.tsx
import React from 'react';

interface CloseButtonProps {
    onClick: () => void;
    isOpen: boolean;
  }
  
  const CloseButton: React.FC<CloseButtonProps> = ({ onClick, isOpen }) => {
    return (
      <button className="text-white z-100" onClick={onClick}>
        {isOpen ? ( // Check the isOpen state to determine the icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
    );
  };
  
  export default CloseButton;