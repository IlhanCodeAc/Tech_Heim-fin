import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { GetAllProductResponseType } from "../../../../services/product/types";
import productService from "../../../../services/product";
import { Link } from "react-router-dom";

const Newproducts: React.FC = () => {
  const [products, setProducts] = useState<GetAllProductResponseType["items"]>([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await productService.getAll({ take: 4, skip: 0 });
        setProducts(response.data.items);
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <div>
      <div className={style.NewTexts}>
        <h3 className="flex-shrink-0 self-stretch w-[217px] text-[#0C0C0C] font-inter text-[32px] font-medium leading-normal">
          New Products
        </h3>
        <Link to="/products">
        <p className="text-center text-[#0C0C0C] font-inter text-[16px] font-normal leading-normal">
          View all {'>'}
        </p>
        </Link>
      </div>
      <div className={style.NewProducts}>
        {products.map((product) => (
          <div key={product._id} className={style.NewProd}>
            <div className={style.ProdImage}>
              <img src={product.images[0] || "placeholder.png"} alt={product.name} />
            </div>
            <div className={style.ProdDetail}>
              <p className="flex mt-[16px] mb-[16px] flex-col justify-center flex-1 self-stretch overflow-hidden text-[#0C0C0C] text-ellipsis whitespace-nowrap font-inter text-[16px] font-medium leading-[24px]">
                {product.name}
              </p>
              <p className="text-[#0C0C0C] font-inter text-[18px] font-medium leading-normal mt-[40px]">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newproducts;
