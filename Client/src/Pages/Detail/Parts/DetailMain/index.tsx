import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import style from "./style.module.css";
import Verify from "../../../../assets/SVGs/verify.svg";
import Delivery from "../../../../assets/SVGs/truck.svg";
import { Product } from "../../../../types";

type Props = {
  product: Product;  // Accept product as a prop
};

const Detailmain: React.FC<Props> = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.images?.[0] || "");
  const [isFavorite, setIsFavorite] = useState(false);

  const handleImageClick = (img: string) => {
    setMainImage(img);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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
            <img src={mainImage} alt={product.name} />
          </div>
          <div className={style.BotImgs}>
            {product.images?.map((img, index) => (
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
              <img src={Verify} alt="Verified" />
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
              <p>Model Name</p>
            </div>
            <div className={style.MidDetRight}>
              <h3>{product.brand}</h3>  {/* Display the product brand */}
              <h3>{product.capacity}</h3>  {/* Display the product capacity */}
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
            {/* Display additional product details */}
            <div className={style.DetGray}>
              <p>Description</p>
              <h3>{product.description}</h3>  {/* Display product description */}
            </div>
            <div className={style.DetWhite}>
              <p>Processor</p>
              <h3>{product.processor}</h3>  {/* Display processor */}
            </div>
            {/* Add more technical details as needed */}
          </div>
        </div>
        <div className={style.DetPrice}>
          <h3>${product.price}</h3>  {/* Display product price */}
          <button className={style.Buy}>Buy It Now</button>
          <button className={style.ToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Detailmain;
