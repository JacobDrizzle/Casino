// Navigation/SideNav.tsx

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GiMoneyStack } from "react-icons/gi";
import { useAuth } from "../../Context/AuthContext";
import IconCard from "./IconCard";
import { useRouter } from "next/navigation";
import { FiHome, FiSettings, FiUser, FiLogOut } from "react-icons/fi";
import { MdEmail, MdFavorite } from "react-icons/md"; // Material Design Icons
import { AiOutlineCalendar, AiOutlineDashboard } from "react-icons/ai"; // Ant Design Icons
import { BsSearch } from "react-icons/bs"; // Bootstrap Icons
import { IoMdChatboxes } from "react-icons/io"; // Ionicons
import CreditModal from "../Modals/CreditModal";
import IconRow from "./IconRow";

const SideNav = () => {
  const { user, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Component did mount, set isClient to true
    setIsClient(true);
  }, []);

  const navItems = [
    { href: "/Games", label: <GiMoneyStack size={"2rem"} /> },
    { href: "/Slots", label: "Slots" },
    { href: "/Poker", label: "Poker" },
  ];
  const icons = [
    <FiHome key="home" />,
    <FiSettings key="settings" />,
    <FiUser key="user" />,
    <FiLogOut key="logout" />,
  ];

  const icons2 = [
    <MdEmail key="email" />,
    <MdFavorite key="favorite" />,
    <AiOutlineCalendar key="calendar" />,
    <AiOutlineDashboard key="dashboard" />,
    <BsSearch key="search" />,
    <IoMdChatboxes key="chatboxes" />,
  ];

  const handleLogout = () => {
    logout(); // Implement logout logic here
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <nav className="p-1.5 text-white bg-[rgba(18,26,36,1)] border-r border-b-gold">
      <a href="/">
        <Image
          className="cursor-pointer py-2 ml-0.5"
          src="/casLogo.png"
          width={40}
          height={40}
          alt="Logo"
          priority={true}
        />
      </a>
      <IconCard />
      <IconCard />
      <IconRow icons={icons} />
      <hr className="w-[40px] ml-0.5 mb-4 border border-gray-500" />
      <IconRow icons={icons2} />
      <hr className="w-[40px] ml-0.5 mb-6 border border-gray-500" />
      <button className="ml-4" onClick={openModal}>
        D
      </button>
      <ul className="space-y-2 p-1 justify-center items-center">
        {navItems.map((item) => (
          <li key={item.href}>
            {/*<a className="nav-list-item">{item.label}</a>*/}
          </li>
        ))}
      </ul>
      <CreditModal isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
};

export default SideNav;
