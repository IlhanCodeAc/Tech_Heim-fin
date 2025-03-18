import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import style from "./style.module.css";
import { Product } from "../../../../types";
import { fetchFilteredProducts } from "../../../../filterUtil";
import { Search } from "lucide-react";
import UserChatDialog from "./userChat";
import { HelpPopover } from "../../../../Components/help-popover";

const Prods = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [limit, setLimit] = useState(3); // Load 3 products initially
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      const filters = {
        search: searchParams.get("search") || undefined,
        graphics_card: searchParams.get("graphicscard") || undefined,
        processor: searchParams.get("processor") || undefined,
        brand: searchParams.get("brand") || undefined,
        min_price: searchParams.get("min_price") ? Number(searchParams.get("min_price")) : undefined,
        max_price: searchParams.get("max_price") ? Number(searchParams.get("max_price")) : undefined,
        category: searchParams.get("category") || undefined,
        capacity: searchParams.get("capacity") || undefined,
        ram: searchParams.get("ram") || undefined,
      };

      const filteredProducts = await fetchFilteredProducts(filters);
      setProducts(filteredProducts.slice(0, limit)); 
      setLoading(false);
    };

    fetchProducts();
  }, [searchParams, limit]); 
  
  const location = useLocation();

  const isDashboardPage = location.pathname.includes(`/user`);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }
    navigate(`?${newParams.toString()}`);
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 3); // Load 3 more products
  };

  return (
    <div className="mb-[25%]">
      {/* Search Bar */}
      <div className="flex items-center bg-white shadow-md rounded-lg px-4 py-2 mb-6 w-full max-w-md mx-auto border border-gray-300 focus-within:border-blue-500">
        <Search className="text-gray-400 mr-2" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="bg-transparent outline-none text-gray-800 placeholder-gray-500 w-full"
        />
      </div>

      {loading ? (
        <div className={style.NewProducts}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className={style.SkeletonProd}>
              <div className={style.SkeletonImage}></div>
              <div className={style.SkeletonText}></div>
              <div className={style.SkeletonPrice}></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        // No Products Found Message
        <div className="flex flex-col items-center justify-center text-center mt-16">
          <div className="text-gray-500 text-6xl mb-4">🔍</div>
          <p className="text-gray-700 text-lg font-semibold">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <p className="text-gray-500 mt-2">
            Try adjusting your search filters or checking back later.
          </p>
        </div>
      ) : (
        <div>
          {/* Product List */}
          <div className={style.NewProducts}>
            {products.map((product) => (
              <Link to={`/products/${product._id}`} key={product._id} className={style.NewProd}>
                <div className={style.ProdImage}>
                  <img src={product.images?.[0]} alt={product.name} />
                </div>
                <div className={style.ProdDetail}>
                  <p className="flex mt-[16px] mb-[16px] flex-col justify-center flex-1 self-stretch overflow-hidden text-[#0C0C0C] text-ellipsis whitespace-nowrap font-inter text-[16px] font-heavy leading-[24px]">
                    {product.name}
                  </p>
                  <p className="text-[#0C0C0C] font-inter text-[18px] font-heavy leading-normal mt-[40px]">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {products.length >= limit && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 text-white bg-[#0C68F4] rounded-md hover:bg-blue-700 transition"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}

      <HelpPopover />
    </div>
  );
};

export default React.memo(Prods);
