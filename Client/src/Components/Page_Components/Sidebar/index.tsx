import { useState, useEffect, useRef } from "react";
import { Button } from "../../components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import Burger from "../../../assets/SVGs/burger-menu-svgrepo-com.svg";
import authService from "../../../services/auth";

const ROUTES = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "user/:id/cart", label: "Cart" },
  { path: "/faq", label: "FAQ" },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex">
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-black text-white transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50 shadow-2xl rounded-r-xl`}
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-700">
          <span className="text-2xl font-semibold text-white">Menu</span>
          <Button onClick={toggleSidebar} variant="ghost" className="text-white">
            X
          </Button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-4">
            {ROUTES.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path.replace(":id", "1")}
                  className={({ isActive }) =>
                    `block px-6 py-3 rounded-lg transition-colors duration-300 ${
                      isActive ? "bg-gray-800" : "hover:bg-gray-800"
                    }`
                  }
                >
                  <span className="text-lg font-medium">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-6 mt-auto border-t border-gray-700">
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
          >
            Log Out
          </Button>
        </div>
      </div>

      <main className="mt-4 ml-4">
        <Button onClick={toggleSidebar} variant="ghost" className="text-gray-300">
          <img src={Burger} alt="Menu" className="w-8 h-8" />
        </Button>
      </main>
    </div>
  );
};
