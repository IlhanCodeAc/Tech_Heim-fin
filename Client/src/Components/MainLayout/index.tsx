import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Page_Components/Navbar/Navbar';
import Footer from '../Page_Components/Footer';

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
