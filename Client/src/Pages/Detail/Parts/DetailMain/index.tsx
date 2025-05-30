import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import style from "./style.module.css";
import Verify from "../../../../assets/SVGs/verify.svg";
import Delivery from "../../../../assets/SVGs/truck.svg";
import productService from "../../../../services/product";
import cartService from "../../../../services/reservation";
import wishlistService from "../../../../services/wishlist"; // Import wishlist service
import Swal from "sweetalert2";

interface Product {
  _id: string;
  name: string;
  brand: { name: string };
  graphicscard: { name: string };
  processor: { name: string };
  capacity: { name: string };
  category?: { name: string };
  price: number;
  images: string[];
  display: { name: string };
  ram: { name: string };
}

const Detailmain: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const response = await productService.getById(id);
        const fetchedProduct: Product = response.data.item;
        setProduct(fetchedProduct);
        setMainImage(fetchedProduct.images?.[0] || "");
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageClick = (img: string) => {
    setMainImage(img);
  };

  const toggleFavorite = async () => {
    if (!product) return;
  
    try {
      if (!isFavorite) {
        const response = await wishlistService.addToWishlist({ productId: product._id });
        console.log("Added to wishlist:", response.data);
        Swal.fire("Success!", "Product added to wishlist!", "success",);
        setIsFavorite(true); 
      } else {
        const response = await wishlistService.removeFromWishlist({ productId: product._id });
        console.log("Removed from wishlist:", response.data);
        Swal.fire("Removed", "Product removed from wishlist", "info");
        setIsFavorite(false);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      Swal.fire("Error", "Failed to update wishlist", "error");
    }
  };
  

  const addToCartHandler = async () => {
    if (!product) return;

    try {
      const data = {
        productId: product._id,
        quantity: 1, 
      };

      await cartService.addToCart(data as any);
      Swal.fire("Success!", "Product added to cart!", "success");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      Swal.fire("Error", "Failed to add product to cart", "error");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <div className={style.DetTopCont}>
        <div className={style.Left}>
          <div className={style.TopImg}>
            {isFavorite ? (
              <FaHeart className={style.heartActive} onClick={toggleFavorite} style={{ color: "red" }} />
            ) : (
              <FaRegHeart className={style.heart} onClick={toggleFavorite} style={{ color: "black" }} />
            )}
            <img src={mainImage} alt="Main product" />
          </div>
          <div className={style.BotImgs}>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                onClick={() => handleImageClick(img)}
                className={style.thumbnail}
              />
            ))}
          </div>
        </div>

        <div className={style.Middle}>
          <div className={style.MidTop}>
            <p>{product.name}</p>
          </div>
          <div className={style.MidMid}>
            <div className={style.MidVarr}>
              <img src={Verify} alt="Verify" />
              <p>Guaranteed</p>
            </div>
            <div className={style.MidDeli}>
              <img src={Delivery} alt="Delivery" />
              <p>Delivery</p>
            </div>
          </div>
          <div className={style.MidDetai}>
            <div className={style.MidDetLeft}>
              <p>Brand</p>
              <p>Product Name</p>
              <p>Category</p>
            </div>
            <div className={style.MidDetRight}>
              <h3>{product.brand?.name || "N/A"}</h3>
              <h3>{product.name}</h3>
              <h3>{product.category?.name || "N/A"}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className={style.DetMain}>
        <div className={style.DetDetail}>
          <div className={style.DetailTop}>
            <p>Technical Details</p>
          </div>
          <div className={style.Details}>
            <div className={style.DetGray}>
              <p>Graphics Card</p>
              <h3>{product.graphicscard?.name || "N/A"}</h3>
            </div>
            <div className={style.DetWhite}>
              <p>Processor</p>
              <h3>{product.processor?.name || "N/A"}</h3>
            </div>
            <div className={style.DetGray}>
              <p>Capacity</p>
              <h3>{product.capacity?.name || "N/A"}</h3>
            </div>
            <div className={style.DetWhite}>
              <p>Category</p>
              <h3>{product.category?.name || "N/A"}</h3>
            </div>
           
          </div>
        </div>

        <div className={style.DetPrice}>
          <h3>${product.price.toFixed(2)}</h3>
          <button className={style.Buy}>Buy It Now</button>
          <button className={style.ToCart} onClick={addToCartHandler}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detailmain;
