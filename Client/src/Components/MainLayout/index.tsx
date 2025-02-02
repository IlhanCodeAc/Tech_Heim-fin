import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Page_Components/Navbar/Navbar';
import Footer from '../Page_Components/Footer';
import { Sidebar } from '../Page_Components/Sidebar';

const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet /> 
      <Footer/>
    </>
  );
};

export default MainLayout;
