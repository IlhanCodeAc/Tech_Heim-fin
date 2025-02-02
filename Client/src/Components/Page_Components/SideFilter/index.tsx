import { useState } from "react";
import { Button } from "../../components/ui/button";
import Filter from "../../../assets/SVGs/filter-solid.svg";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCategory = () => setCategoryOpen(!categoryOpen);
  const togglePrice = () => setPriceOpen(!priceOpen);
  const toggleBrand = () => setBrandOpen(!brandOpen);

  const clearFilters = () => {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => (checkbox.checked = false));
    document.querySelectorAll('input[type="number"]').forEach((input) => (input.value = ""));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} z-50 p-6 shadow-lg transform`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button onClick={toggleSidebar} variant="ghost" className="text-white">×</Button>
        </div>

        <nav>
          <ul className="space-y-6">
            <li>
              <button 
                onClick={toggleCategory} 
                className="w-full text-left px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 flex justify-between items-center transition-transform duration-300"
              >
                Categories <span>{categoryOpen ? "▲" : "▼"}</span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 max-h-0 ${categoryOpen ? "max-h-96 opacity-100" : "opacity-0"}`}
              >
                {categoryOpen && (
                  <ul className="pl-4 space-y-3 mt-2 opacity-100 transition-opacity duration-300">
                    {['Electronics', 'Clothing', 'Home Appliances'].map((category, index) => (
                      <li key={index} className="flex items-center space-x-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-all duration-300">
                        <input 
                          type="checkbox" 
                          id={category} 
                          className="appearance-none w-5 h-5 border-2 border-white rounded-md checked:bg-blue-500 checked:border-transparent cursor-pointer transition-all duration-300" 
                        />
                        <label htmlFor={category} className="cursor-pointer">{category}</label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
            <li>
              <button 
                onClick={togglePrice} 
                className="w-full text-left px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 flex justify-between items-center transition-transform duration-300"
              >
                Price Range <span>{priceOpen ? "▲" : "▼"}</span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 max-h-0 ${priceOpen ? "max-h-96 opacity-100" : "opacity-0"}`}
              >
                {priceOpen && (
                  <div className="px-4 py-2 mt-2 opacity-100 transition-opacity duration-300">
                    <input type="number" placeholder="Min Price" className="w-full p-2 text-black rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500" />
                    <input type="number" placeholder="Max Price" className="w-full p-2 text-black rounded-md border border-gray-300 mt-2 focus:ring-2 focus:ring-blue-500" />
                  </div>
                )}
              </div>
            </li>
            <li>
              <button 
                onClick={toggleBrand} 
                className="w-full text-left px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 flex justify-between items-center transition-transform duration-300"
              >
                Brands <span>{brandOpen ? "▲" : "▼"}</span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 max-h-0 ${brandOpen ? "max-h-96 opacity-100" : "opacity-0"}`}
              >
                {brandOpen && (
                  <ul className="pl-4 space-y-3 mt-2 opacity-100 transition-opacity duration-300">
                    {['Nike', 'Samsung', 'Apple'].map((brand, index) => (
                      <li key={index} className="flex items-center space-x-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-all duration-300">
                        <input 
                          type="checkbox" 
                          id={brand} 
                          className="appearance-none w-5 h-5 border-2 border-white rounded-md checked:bg-blue-500 checked:border-transparent cursor-pointer transition-all duration-300" 
                        />
                        <label htmlFor={brand} className="cursor-pointer">{brand}</label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
            <li>
              <Button 
                onClick={clearFilters} 
                variant="outline" 
                className="w-full mt-4 bg-gray-800 hover:bg-gray-700 transition-all duration-300"
              >
                Clear All Filters
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      <main className="mt-[20px]">
        <Button onClick={toggleSidebar} variant="ghost">
          <img src={Filter} alt="" className="w-[24px] h-[24px] transition-transform duration-300 transform hover:scale-110" />
        </Button>
      </main>
    </div>
  );
};
