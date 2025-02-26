import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import Filter from "../../../assets/SVGs/filter-solid.svg";
import categoryService from "../../../services/category";
import brandService from "../../../services/brand";
import graphicsCardService from "../../../services/graphicscard";
import capacityService from "../../../services/capacity";
import processorService from "../../../services/processor";
import ramService from "../../../services/ram";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [graphicsCards, setGraphicsCards] = useState<any[]>([]);
  const [capacities, setCapacities] = useState<any[]>([]);
  const [processors, setProcessors] = useState<any[]>([]);
  const [rams, setRams] = useState<any[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();


const sidebarRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  if (isOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [isOpen]);


  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAll();
        setCategories(response.data.items);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await brandService.getAll();
        setBrands(response.data.items);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    const fetchGraphicsCards = async () => {
      try {
        const response = await graphicsCardService.getAll();
        setGraphicsCards(response.data.items);
      } catch (error) {
        console.error("Error fetching graphics cards:", error);
      }
    };

    const fetchCapacities = async () => {
      try {
        const response = await capacityService.getAll();
        setCapacities(response.data.items);
      } catch (error) {
        console.error("Error fetching capacities:", error);
      }
    };

    const fetchProcessors = async () => {
      try {
        const response = await processorService.getAll();
        setProcessors(response.data.items);
      } catch (error) {
        console.error("Error fetching processors:", error);
      }
    };

    const fetchRams = async () => {
      try {
        const response = await ramService.getAll();
        setRams(response.data.items);
      } catch (error) {
        console.error("Error fetching rams:", error);
      }
    };

    fetchCategories();
    fetchBrands();
    fetchGraphicsCards();
    fetchCapacities();
    fetchProcessors();
    fetchRams();
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

  const handlePriceChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const getCheckedState = (key: string, value: string) => {
    return searchParams.getAll(key).includes(value);
  };

  return (
    <div className="flex">
    <div
  ref={sidebarRef}
  className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} z-50 p-6 shadow-lg transform`}
  style={{ overflowY: "auto" }}
>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button onClick={toggleSidebar} variant="ghost" className="text-white">
            ×
          </Button>
        </div>

        <nav>
          <ul className="space-y-6">
            {/* Price Filter */}
            <li>
              <button
                onClick={togglePrice}
                className="w-full text-left px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 flex justify-between items-center transition-transform duration-300"
              >
                Price Range <span>{priceOpen ? "▲" : "▼"}</span>
              </button>
              {priceOpen && (
                <div className="px-4 py-2 mt-2">
                  <input
                    type="number"
                    placeholder="Min Price"
                    className="w-full p-2 text-black rounded-md border border-gray-300"
                    onChange={(e) => handlePriceChange("min_price", e.target.value)}
                    value={searchParams.get("min_price") || ""}
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    className="w-full p-2 text-black rounded-md border border-gray-300 mt-2"
                    onChange={(e) => handlePriceChange("max_price", e.target.value)}
                    value={searchParams.get("max_price") || ""}
                  />
                </div>
              )}
            </li>

            {/* Categories Filter */}
            <li>
              <h3 className="font-semibold text-lg mb-3">Categories</h3>
              <ul className="pl-4 space-y-3">
                {categories.map((category) => (
                  <li key={category._id} className="flex items-center space-x-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700">
                    <input
                      type="checkbox"
                      onChange={() => updateFilter("category", category._id)}
                      checked={getCheckedState("category", category._id)}
                    />
                    <label>{category.name}</label>
                  </li>
                ))}
              </ul>
            </li>

            {/* Brands Filter */}
            <li>
              <h3 className="font-semibold text-lg mb-3">Brands</h3>
              <ul className="pl-4 space-y-3">
                {brands.map((brand) => (
                  <li key={brand._id} className="flex items-center space-x-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700">
                    <input
                      type="checkbox"
                      onChange={() => updateFilter("brand", brand._id)}
                      checked={getCheckedState("brand", brand._id)}
                    />
                    <label>{brand.name}</label>
                  </li>
                ))}
              </ul>
            </li>

            {/* Graphics Cards Filter */}
            <li>
              <h3 className="font-semibold text-lg mb-3">Graphics Cards</h3>
              <ul className="pl-4 space-y-3">
                {graphicsCards.map((graphicsCard) => (
                  <li key={graphicsCard._id} className="flex items-center space-x-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700">
                    <input
                      type="checkbox"
                      onChange={() => updateFilter("graphicscard", graphicsCard._id)}
                      checked={getCheckedState("graphicscard", graphicsCard._id)}
                    />
                    <label>{graphicsCard.name}</label>
                  </li>
                ))}
              </ul>
            </li>

            {/* Capacities Filter */}
            <li>
              <h3 className="font-semibold text-lg mb-3">Capacity</h3>
              <ul className="pl-4 space-y-3">
                {capacities.map((capacity) => (
                  <li key={capacity._id} className="flex items-center space-x-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700">
                    <input
                      type="checkbox"
                      onChange={() => updateFilter("capacity", capacity._id)}
                      checked={getCheckedState("capacity", capacity._id)}
                    />
                    <label>{capacity.name}</label>
                  </li>
                ))}
              </ul>
            </li>

            {/* Processors Filter */}
            <li>
              <h3 className="font-semibold text-lg mb-3">Processors</h3>
              <ul className="pl-4 space-y-3">
                {processors.map((processor) => (
                  <li key={processor._id} className="flex items-center space-x-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700">
                    <input
                      type="checkbox"
                      onChange={() => updateFilter("processor", processor._id)}
                      checked={getCheckedState("processor", processor._id)}
                    />
                    <label>{processor.name}</label>
                  </li>
                ))}
              </ul>
            </li>

            {/* RAM Filter */}
            <li>
              <h3 className="font-semibold text-lg mb-3">RAM</h3>
              <ul className="pl-4 space-y-3">
                {rams.map((ram) => (
                  <li key={ram._id} className="flex items-center space-x-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700">
                    <input
                      type="checkbox"
                      onChange={() => updateFilter("ram", ram._id)}
                      checked={getCheckedState("ram", ram._id)}
                    />
                    <label>{ram.name}</label>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full mt-4 bg-gray-800 hover:bg-gray-700"
              >
                Clear All Filters
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      <main className="mt-[20px]">
        <Button onClick={toggleSidebar} variant="ghost">
          <img
            src={Filter}
            alt="filter icon"
            className="w-[24px] h-[24px] transition-transform duration-300 transform hover:scale-110"
          />
        </Button>
      </main>
    </div>
  );
};
