import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import style from "./style.module.css";
import productService from "../../../../services/product";
import { Product } from "../../../../types";
import ramService from "../../../../services/ram"; 
import { fetchFilteredProducts } from "../../../../filterUtil";

const Prods = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [ramFilter, setRamFilter] = useState<string | null>(null); 
  const [ramOptions, setRamOptions] = useState<{ _id: string; name: string }[]>([]); 
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchRamOptions = async () => {
      try {
        const response = await ramService.getAll(); 
        setRamOptions(response.data.items); 
      } catch (error) {
        console.error("Error fetching RAM options:", error);
      }
    };

    fetchRamOptions();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      const filters = {
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

  return (
    <div>
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
    </div>
  );
};

export default React.memo(Prods);
