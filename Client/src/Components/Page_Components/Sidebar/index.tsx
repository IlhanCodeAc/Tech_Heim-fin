import { useState } from "react";
import { Button } from "../../components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import Burger from "../../../assets/SVGs/burger-menu-svgrepo-com.svg";
import authService from "../../../services/auth";

const ROUTES = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "user/:id/cart", label: "Cart" },
  { path: "/settings", label: "Settings" },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("user");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50 shadow-lg`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <span className="text-lg font-bold">Menu</span>
          <Button onClick={toggleSidebar} variant="ghost">X</Button>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            {ROUTES.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path.replace(":id", "1")}
                  className={({ isActive }) =>
                    `block px-4 py-2 transition-colors duration-300 ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white">
            Log Out
          </Button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <main className="mt-4 ml-4">
        <Button onClick={toggleSidebar} variant="ghost">
          <img src={Burger} alt="Menu" className="w-6 h-6" />
        </Button>
      </main>
    </div>
  );
};
