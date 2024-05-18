"use client"
import React from 'react';
import TopNav from '../Components/Navigation/TopNav';
import SideNav from '../Components/Navigation/SideNav';
import Footer from '../Components/Footer/footer';

interface LayoutProps {
    children: React.ReactNode;
  }
  
const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className='flex max-w-[100vw] min-h-[100vh] bg-[rgba(18,30,38,1)] overflow-hidden'>
        <SideNav />
        <div>
          <TopNav />
          {children}
          <Footer />
        </div>
    </div>
  );
};

export default Layout;