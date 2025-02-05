import React, { useState } from "react";
import { Menu, X, User, ShoppingBag, Package, Heart, Mail, LogOut } from "lucide-react";
import style from "./style.module.css"; 
import UserSVG from "../../../../assets/SVGs/user.svg";

interface SidebarProps {
  setSelectedPage: (page: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  selectedPage: string; 
}

interface ContentProps {
  selectedPage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedPage, isOpen, toggleSidebar, selectedPage }) => {
  const handleClick = (page: string) => {
    setSelectedPage(page);
    if (window.innerWidth < 768) toggleSidebar();
  };

  return (
    <div
      className={`fixed md:relative top-0 left-0 h-full w-64 border border-[#F6F6F6] bg-[#F9F9F9] rounded-lg p-5 
        transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <button className="md:hidden absolute top-4 right-4" onClick={toggleSidebar}>
        <X size={24} />
      </button>

      <div className={style.User}>
        <img src={UserSVG} alt="User" className="w-[40px] h-[40px]" />
        <h2>Ilhan Afandiyev</h2>
      </div>

      <ul className="mt-5 space-y-2">
        <li
          className={`flex items-center p-2 cursor-pointer rounded-md 
            ${selectedPage === "personal-data" ? "text-[#0C68F4] border-l-4 border-[#0C68F4]" : "hover:bg-gray-300"}`}
          onClick={() => handleClick("personal-data")}
        >
          <User size={20} className="mr-2" /> Personal Data
        </li>
        <li
          className={`flex items-center p-2 cursor-pointer rounded-md 
            ${selectedPage === "orders" ? "text-[#0C68F4] border-l-4 border-[#0C68F4]" : "hover:bg-gray-300"}`}
          onClick={() => handleClick("orders")}
        >
          <ShoppingBag size={20} className="mr-2" /> Orders
        </li>
        <li
          className={`flex items-center p-2 cursor-pointer rounded-md 
            ${selectedPage === "products" ? "text-[#0C68F4] border-l-4 border-[#0C68F4]" : "hover:bg-gray-300"}`}
          onClick={() => handleClick("products")}
        >
          <Package size={20} className="mr-2" /> Products
        </li>
        <li
          className={`flex items-center p-2 cursor-pointer rounded-md 
            ${selectedPage === "wishlist" ? "text-[#0C68F4] border-l-4 border-[#0C68F4]" : "hover:bg-gray-300"}`}
          onClick={() => handleClick("wishlist")}
        >
          <Heart size={20} className="mr-2" /> Wish List
        </li>
        <li
          className={`flex items-center p-2 cursor-pointer rounded-md 
            ${selectedPage === "contact" ? "text-[#0C68F4] border-l-4 border-[#0C68F4]" : "hover:bg-gray-300"}`}
          onClick={() => handleClick("contact")}
        >
          <Mail size={20} className="mr-2" /> Contact Us
        </li>
      </ul>

      <div className="mt-auto">
        <button className="flex items-center text-red-500 p-2 w-full hover:bg-red-50 rounded-md">
          <LogOut size={20} className="mr-2" /> Log Out
        </button>
      </div>
    </div>
  );
};

const Content: React.FC<ContentProps> = ({ selectedPage }) => {
  return (
    <div className="p-5">
      {selectedPage === "personal-data" && <h2>Personal Data Page</h2>}
      {selectedPage === "orders" && <h2>Orders Page</h2>}
      {selectedPage === "products" && <h2>Products Page</h2>}
      {selectedPage === "wishlist" && <h2>Wish List Page</h2>}
      {selectedPage === "contact" && <h2>Contact Us Page</h2>}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>("orders");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen border border-[#F6F6F6] bg-[#F9F9F9] rounded-lg p-4 relative">
      <Sidebar 
        setSelectedPage={setSelectedPage} 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        selectedPage={selectedPage} 
      />
      <div className="flex-1 flex flex-col px-4">
        <button className="md:hidden p-2" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>

        <Content selectedPage={selectedPage} />
      </div>
    </div>
  );
};

export default Dashboard;
