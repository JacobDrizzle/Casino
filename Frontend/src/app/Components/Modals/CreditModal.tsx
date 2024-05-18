import React, { useState, useContext } from "react";
import { useAuth } from "../../Context/AuthContext";
import Image from "next/image";

interface CreditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreditModal: React.FC<CreditModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const { user, token } = useAuth();
  const cryptocurrencies = [
    { name: "Bitcoin", symbol: "BTC", iconUrl: "/images/Bitcoin.svg" },
    { name: "Ethereum", symbol: "ETH", iconUrl: "/images/Ethereum.svg" },
    // Add more cryptocurrencies as needed
  ];

  if (!isOpen) return null;

  const handleDeposit = async (e: any) => {
    e.preventDefault();
    if (!amount) {
      alert("Please enter an amount.");
      return;
    }

    try {
      const response = await fetch("/update_credit/" + user?.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // if your API requires authentication
        },
        body: JSON.stringify({ amount, transaction_type: "deposit" }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Deposit successful. New Credit: " + data.new_credit);
        onClose(); // Close the modal
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Deposit error:", error);
      alert("An error occurred while processing your deposit.");
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-10 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-[#1a2635] border border-[#799fbe] rounded-lg p-4 w-96 text-white">
        <div className="p-4 rounded-lg">
          <form onSubmit={handleDeposit}>
            <h2 className="text-center font-bold pb-2">Deposit Crypto</h2>
            <div className="flex justify-center pb-2 gap-5">
              {cryptocurrencies.map((crypto) => (
                <Image
                  key={crypto.symbol}
                  src={crypto.iconUrl}
                  width={36}
                  height={36}
                  alt={crypto.name}
                  className={`transition-transform transform ${
                    selectedCrypto === crypto.symbol ? "scale-105" : ""
                  }`}
                  onClick={() => setSelectedCrypto(crypto.symbol)}
                />
              ))}
            </div>
            <input
              type="number"
              placeholder="Enter amount"
              className="block w-full rounded border border-opacity-20 bg-gray-700 p-2 mb-2 transition-colors focus:border-[#799fbe]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-black border border-yellow-500 rounded h-10 font-semibold mt-2"
            >
              Deposit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreditModal;
