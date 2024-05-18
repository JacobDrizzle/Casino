// SlotMachine.tsx
"use client";
import React, { useState, useEffect } from "react";
import WinningModal from "../Modals/Modal";
import { useAuth } from "../../Context/AuthContext";

const SlotMachine: React.FC = () => {
  const [symbols, setSymbols] = useState<string[][]>([]);
  const [spinAmount, setSpinAmount] = useState<number>(25);
  const [spun, setSpun] = useState<boolean>(false);
  const [symbolPositions, setSymbolPositions] = useState<number[]>(
    new Array(symbols.length).fill(0)
  );
  const [animationComplete, setAnimationComplete] = useState<boolean[]>(
    new Array(symbols.length).fill(false)
  );
  const [applyTransition, setApplyTransition] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [payout, setPayout] = useState(0);
  const { user, logout } = useAuth();

  const handleCloseModal = () => setShowModal(false);

  // Function to fetch initial state or reset the game
  const initializeOrResetSymbols = async () => {
    // Call an endpoint from the backend to get the initial state
    const response = await fetch("http://localhost:5000/initialize");
    let initialSymbols = await response.json();

    setSymbols(initialSymbols);
    // Reset positions to show the first three symbols
    setSymbolPositions(initialSymbols.map(() => 0));
    console.log(initialSymbols);
  };

  const spin = async (): Promise<void> => {
    console.log("Starting the spin...");
    setSpun(true); // Indicate that spinning has started
    setAnimationComplete(new Array(symbols.length).fill(false)); // Reset animation complete state
    const token = localStorage.getItem("token");

    console.log("Symbols before animation:", symbols);

    // Start the spin animation with placeholder symbols
    const symbolHeight = 85; // Assuming each symbol's height

    // fetch the result from the backend

    const response = await fetch("http://localhost:5000/spin", {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });
    const { result, win, payout } = await response.json();
    console.log("Result from backend:", result);
    console.log({ win, payout });

    // Calculate the final positions to show the backend result in the middle row
    const visibleRows = 3; // The number of visible rows in the slot machine
    const middleOffset = Math.floor(visibleRows / 2) * symbolHeight; // Offset to center the middle row

    const backendSymbolPositions = result.map(
      (symbol: string, reelIndex: number) => {
        const symbolIndex = symbols[reelIndex].indexOf(symbol);
        // Ensure the symbol is positioned in the middle row by adjusting with middleOffset
        const finalPosition = -(symbolIndex * symbolHeight) + middleOffset;
        return finalPosition;
      }
    );

    console.log("Backend symbol positions:", backendSymbolPositions);
    setApplyTransition(false);

    setSymbolPositions(backendSymbolPositions); // Update the positions to show the backend result

    setTimeout(async () => {
      if (win) {
        setPayout(payout);
        setShowModal(true); // Show modal on win
      }
      setSpun(false); // Spinning complete
    }, 4000);
    console.log("Symbols after updating with backend result:", symbols);

    console.log("Spin completed.");
  };

  const handleSpinAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSpinAmount(parseInt(event.target.value));
  };

  const autoSpin = async (): Promise<void> => {
    const spins: number = spinAmount;
    if (!isNaN(spins)) {
      for (let i = 0; i < spins; i++) {
        spin();
        setSpinAmount(spins - i);
        await new Promise((resolve) => setTimeout(resolve, 6000)); // Delay between spins
      }
    }
  };

  useEffect(() => {
    initializeOrResetSymbols();
  }, []);

  return (
    <div className="flex flex-col w-[95vw] items-center justify-center h-screen">
      <div className="flex justify-center items-center mb-5">
        {symbols.map((slot, index) => (
          <div
            key={index}
            className="w-[100px] h-[267.5px] border border-black rounded-lg inline-block overflow-hidden relative bg-gray-100 shadow-inner"
          >
            <div
              className="absolute top-0 left-0 transition-top duration-4000"
              style={{
                top: `${symbolPositions[index]}px`,
                transition: "top 4s",
              }}
            >
              {slot.map((symbol, i) => (
                <div
                  key={i}
                  className="w-[100px] h-[85px] text-5xl leading-[100px] text-center"
                >
                  {symbol}
                </div>
              ))}
            </div>
          </div>
        ))}
        <WinningModal
          isOpen={showModal}
          onClose={handleCloseModal}
          payout={payout}
        />
        <div className="relative ml-5">
          <div
            className="bg-red-500 h-[55px] w-[55px] rounded-full relative shadow-inner"
            onClick={spin}
          ></div>
          <div className="bg-gray-500 h-[250px] w-[25px] rounded-lg mt-[-40px] ml-[15px] shadow-inner"></div>
        </div>
      </div>

      <div className="flex gap-4 mr-4">
        <button className="border border-b-gold rounded-lg bg-blue-600 text-white w-[40px]">
          {user?.credit}
        </button>
        <button
          className="border border-b-gold rounded-lg bg-blue-600 text-white p-2 w-[80px]"
          onClick={spin}
        >
          Spin
        </button>
        <button
          className="border border-b-gold rounded-lg bg-blue-600 text-white w-[80px] mr-4"
          onClick={initializeOrResetSymbols}
        >
          Reset
        </button>
        <input
          className="w-[60px] border-2 border-b-gold rounded-md ml-1.5 text-black pl-2"
          type="number"
          placeholder={"25"}
          value={spinAmount}
          onChange={handleSpinAmountChange}
        />
        <button
          className="border border-yellow-400 rounded-lg bg-blue-600 text-white w-[80px]"
          onClick={autoSpin}
        >
          Auto
        </button>
      </div>
    </div>
  );
};

export default SlotMachine;
