import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detailmain from "./Parts/DetailMain";
import Comments from "./Parts/DetailComments";
import productService from "../../services/product";
import { Product } from "../../types";

const Detailpage = () => {
  const { id } = useParams<{ id: string }>();  // Extract product ID from the URL
  const [product, setProduct] = useState<Product | null>(null);  // Store product details
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          console.log(`Fetching product with ID: ${id}`);
          const response = await productService.getById(id);  // Fetch product by ID
          console.log(response.data);  // Check if we got the correct product data
          setProduct(response.data);  // Set the fetched product to state
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);  // Stop loading after the request finishes
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-[80px] mb-[80px]">
      {product ? (
        <>
          <Detailmain product={product} /> 
          <Comments />
        </>
      ) : (
        <p>Product not found</p> 
      )}
    </div>
  );
};


export default Detailpage;
