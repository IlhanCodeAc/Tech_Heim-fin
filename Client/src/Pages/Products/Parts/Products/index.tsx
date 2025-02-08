import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link component
import style from "./style.module.css";
import productService from "../../../../services/product";
import { Product } from "../../../../types";

const Prods = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; 
    const fetchProducts = async () => {
      try {
        const response = await productService.getAll();
        console.log("API Response:", response.data);

        if (isMounted && response.data?.items) {
          setProducts((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(response.data.items)) {
              return response.data.items;
            }
            return prev;
          });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className={style.NewProducts}>
          {products.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id} className={style.NewProd}> {/* Wrap the card with Link */}
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
