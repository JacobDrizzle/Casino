import React from "react";
import Hero from "./Components/Home/Hero";
import Chat from "./Components/Home/Chat";
import WinCard from "./Components/Home/Cards/WinCard";
import GameCard from "./Components/Home/Cards/GameCard";
import Layout from "./Layout/Layout";

const winData = [
  {
    profileImage: "/Images/Ethereum.svg",
    userName: "John Doe",
    amountWon: 100,
    gamePlayed: "Slots",
  },
  {
    profileImage: "/Images/Bitcoin.svg",
    userName: "Jane Smith",
    amountWon: 200,
    gamePlayed: "Poker",
  },
  {
    profileImage: "/Images/Ethereum.svg",
    userName: "Mike Johnson",
    amountWon: 150,
    gamePlayed: "Blackjack",
  },
  {
    profileImage: "/Images/Bitcoin.svg",
    userName: "John Johnson",
    amountWon: 150,
    gamePlayed: "Blackjack",
  },
  {
    profileImage: "/Images/Ethereum.svg",
    userName: "Joe Swanson",
    amountWon: 150,
    gamePlayed: "Blackjack",
  },
  {
    profileImage: "/Images/Bitcoin.svg",
    userName: "Peter Griffin",
    amountWon: 150,
    gamePlayed: "Blackjack",
  },
  // Add more sample data as needed
];
const HomePage: React.FC = () => {


  return (
    <Layout>
      <Hero />
      <div className="mt-14 ml-6 flex overflow-hidden pt-2 gap-6">
        {winData.map((win, index) => (
          <WinCard
            key={index}
            profileImage={win.profileImage}
            userName={win.userName}
            amountWon={win.amountWon}
            gamePlayed={win.gamePlayed}
          />
        ))}
      </div>
      <div className="flex ml-6 gap-5 z-1">
        <GameCard imageUrl="/Images/Game.png" gameName="Game Name" />
        <GameCard imageUrl="/Images/Game.png" gameName="Game Name" />
        <GameCard imageUrl="/Images/Game.png" gameName="Game Name" />
        <GameCard imageUrl="/Images/Game.png" gameName="Game Name" />
        <GameCard imageUrl="/Images/Game.png" gameName="Game Name" />
        <GameCard imageUrl="/Images/Game.png" gameName="Game Name" />
        <GameCard imageUrl="/Images/Game.png" gameName="Game Name" />
        <GameCard imageUrl="/Images/Game.png" gameName="Game Name" />
        <GameCard imageUrl="/Images/Game.png" gameName="Game Name" />
        <GameCard imageUrl="/Images/Game.png" gameName="Game Name" />
      </div>
      <Chat />
    </Layout>
  );
};

export default HomePage;
