import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detailmain from "./Parts/DetailMain";
import Comments from "./Parts/DetailComments";
import productService from "../../services/product";
import { Product } from "../../types";

const Detailpage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          console.log(`Fetching product with ID: ${id}`);
          const response = await productService.getById(id);
          console.log(response.data);
          setProduct(response.data as any);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mt-[80px] mb-[80px]">
      <>
        <Detailmain  />
        <Comments  />
      </>
    </div>
  );
};

export default Detailpage;
