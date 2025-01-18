import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Page_Components/Navbar/Navbar';

const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet /> 
    </>
  );
};

export default MainLayout;
