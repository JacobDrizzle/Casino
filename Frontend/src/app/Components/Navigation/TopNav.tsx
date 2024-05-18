// Navigation/TopNav.tsx

"use client"
import React, {useState, useEffect} from 'react';
import AuthModal from '../Modals/AuthModal';
import { GiMoneyStack } from "react-icons/gi";
import { useAuth } from '../../Context/AuthContext';

const TopNav = () => {
  const [showModal, setShowModal] = useState(false);
  const handleLoginModal = () => {setShowModal(!showModal); setIsLogin(true)};
  const handleRegisterModal = () => {setShowModal(!showModal); setIsLogin(false)};
  const { user, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // True for login, false for registration

  useEffect(() => {
    // Component did mount, set isClient to true
    setIsClient(true);
  }, []);

  const navItems = [
    { href: '/Statistics', label: <GiMoneyStack size={"2rem"}/> },
    { href: '/physics', label: 'Slots' },
    { href: '/chemistry', label: 'Poker' },
  ];
  const handleLogout = () => {
    logout(); // Implement logout logic here
  };

  return (
    <nav className="fixed w-full z-99 flex bg-[#1a2635] justify-end">
      <div className="rounded-xl py-1.5 pr-20">
        {isClient && user ? (
          <div className="flex">
            <button className="text-white font-bold text-sm mr-5" onClick={handleLogout}>
              Logout
            </button>
            <p className="mt-1 text-sm rounded-md bg-primaryBlue py-2 px-3 font-medium mx-5 text-white">
              {user.username}
            </p>
          </div>
        ) : (
          <div className="flex pr-6">
            <button className="text-white font-bold text-sm mr-6" onClick={handleLoginModal}>
              Login
            </button>
            <button
              className="relative py-2 px-3 border border-b-black text-white font-bold text-sm rounded-md bg-blue-600"
              onClick={handleRegisterModal}
            >
              Register
            </button>
          </div>
        )}
        {showModal && (
          <AuthModal
            setIsLogin={setIsLogin}
            isLogin={isLogin}
            isOpen={showModal}
            onClose={handleLoginModal}
          />
        )}
      </div>
    </nav>
  );
};

export default TopNav;