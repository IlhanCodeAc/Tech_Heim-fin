import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  
  // Assuming you fetch or define the userId and conversationId here
  const [userId, setUserId] = useState<string>("user123");  // Set default userId or fetch from context or API
  const [conversationId, setConversationId] = useState<string>("conv456");  // Set default conversationId or fetch

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      const filters = {
        search: searchParams.get("search") || undefined,
        graphics_card: searchParams.get("graphics_card") || undefined,
        processor: searchParams.get("processor") || undefined,
        brand: searchParams.get("brand") || undefined,
        min_price: searchParams.get("min_price") ? Number(searchParams.get("min_price")) : undefined,
        max_price: searchParams.get("max_price") ? Number(searchParams.get("max_price")) : undefined,
        category: searchParams.get("category") || undefined,
        capacity: searchParams.get("capacity") || undefined,
        ram: searchParams.get("ram") || undefined,
      };

      const filteredProducts = await fetchFilteredProducts(filters);
      setProducts(filteredProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [searchParams]);

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

  return (
    <div className="mb-[100%]">
      <div className="flex items-center bg-white shadow-md rounded-lg px-4 py-2 mb-6 w-full max-w-md mx-auto border border-gray-300 focus-within:border-blue-500">
        <Search className="text-gray-400 mr-2" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className=" bg-transparent outline-none text-gray-800 placeholder-gray-500"
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
      ) : (
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
      )}
      <HelpPopover/>
    </div>
  );
};

export default React.memo(Prods);
