import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import Filter from "../../../assets/SVGs/filter-solid.svg";
import categoryService from "../../../services/category";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]); 

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAll();
        setCategories(response.data.items); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const togglePrice = () => setPriceOpen(!priceOpen);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const currentValues = params.getAll(key);
    if (currentValues.includes(value)) {
      params.delete(key);
    } else {
      params.append(key, value);
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="flex">
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
              <button onClick={togglePrice} className="w-full text-left px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 flex justify-between items-center transition-transform duration-300">
                Price Range <span>{priceOpen ? "▲" : "▼"}</span>
              </button>
              {priceOpen && (
                <div className="px-4 py-2 mt-2">
                  <input type="number" placeholder="Min Price" className="w-full p-2 text-black rounded-md border border-gray-300" onChange={(e) => updateFilter("min_price", e.target.value)} />
                  <input type="number" placeholder="Max Price" className="w-full p-2 text-black rounded-md border border-gray-300 mt-2" onChange={(e) => updateFilter("max_price", e.target.value)} />
                </div>
              )}
            </li>

            <li>
              <h3 className="font-semibold text-lg mb-3">Categories</h3>
              <ul className="pl-4 space-y-3">
                {categories.map((category) => (
                  <li key={category._id} className="flex items-center space-x-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700">
                    <input type="checkbox" onChange={() => updateFilter("category", category._id)} checked={searchParams.get("category") === category._id} />
                    <label>{category.name}</label>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Button onClick={clearFilters} variant="outline" className="w-full mt-4 bg-gray-800 hover:bg-gray-700">
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
