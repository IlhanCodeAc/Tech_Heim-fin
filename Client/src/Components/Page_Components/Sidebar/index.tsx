import { useState } from "react";
import { Button } from "../../components/ui/button"; 
import Burger from "../../../assets/SVGs/burger-menu-svgrepo-com.svg"

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <div className="p-4">
          <Button onClick={toggleSidebar} variant="ghost">
            Close Sidebar
          </Button>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <main className="mt-[20px]">
        <Button onClick={toggleSidebar} variant="ghost">
          <img src={Burger} alt=""  className="w-[24px] h-[24px] background-transparent"/>
        </Button>
      </main>
    </div>
  );
};
