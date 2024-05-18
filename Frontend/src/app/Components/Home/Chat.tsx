// Home/Chat.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext"; // Assuming you have an AuthContext for user authentication
import Message from "./Message";
import CloseButton from "../Buttons/CloseButton";

const Chat: React.FC = () => {
  const { user } = useAuth(); // Get the authenticated user
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([
    "Hello!",
    "How are you?",
    "I am fine, thank you!",
  ]);
  // Dummy function to send a message (will replace this with WebSocket communication)
  const sendMessage = () => {
    // Send the message to the WebSocket server or update state if using a mock
    setMessages([...messages, newMessage]);
    setNewMessage("");
  };
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`fixed top-0 right-0 flex flex-col justify-end bg-[rgba(18,26,34)] h-[95vh] mt-[50px] border-l border-[rgba(244,196,88,0.8)] transition-width duration-500 ${
        isOpen ? "md:w-[325px] sm:w-[0px]" : "w-[50px]"
      }`}
    >
      <div className="flex absolute top-0 right-0 p-4">
        <CloseButton onClick={toggleChat} isOpen={isOpen} />
      </div>
      {isOpen && (
        <div className="p-3 overflow-y-auto max-h-[80vh]">
          {messages.map((message, index) => (
            <Message key={index} text={message} />
          ))}
        </div>
      )}
      {isOpen && (
        <div className="flex border rounded-xl max-w-[93%] px-2 pt-2 ml-3 mb-3">
          <textarea
            className="p-1 mb-2 border border-none text-white focus:outline-none rounded-lg w-full bg-transparent max-h-12"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="mt-[-10px] ml-[-40px] text-neutral-200 cursor-pointer rotate-90"
            onClick={sendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
