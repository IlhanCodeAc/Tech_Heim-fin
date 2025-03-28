import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Page_Components/Navbar/Navbar';
import Footer from '../Page_Components/Footer';
import { HelpPopover } from '../help-popover';
import ScrollToTopButton from '../Page_Components/ToTop';

const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet /> 
      <Footer/>
      <HelpPopover/>
      <ScrollToTopButton/>
    </>
  );
};

export default MainLayout;
