import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import style from "./style.module.css";
import Iphone from "../../../../assets/Images/16promax.png";
import Iphone2 from "../../../../assets/Images/300_1726508347-16-pro-max-blk-2.png";
import Verify from "../../../../assets/SVGs/verify.svg"
import Delivery from "../../../../assets/SVGs/truck.svg"

const Detailmain = () => {
  const [mainImage, setMainImage] = useState(Iphone);
  const [isFavorite, setIsFavorite] = useState(false);
  const thumbnails = [Iphone2, Iphone, Iphone];

  const handleImageClick = (img:any) => {
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
          <FaHeart className={style.heartActive} onClick={toggleFavorite} style={{ color: 'red' }} />
        ) : (
          <FaRegHeart className={style.heart} onClick={toggleFavorite} style={{ color: 'black' }} />
        )}
        <img src={mainImage} alt="Main" />
      </div>
      <div className={style.BotImgs}>
        {thumbnails.map((img, index) => (
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
        <p>Iphone 16 Pro Max 256GB</p>
      </div>
      <div className={style.MidMid}>
        <div className={style.MidVarr}>
          <img src={Verify} alt="" />
          <p>Guaranteed</p>
        </div>
        <div className={style.MidDeli}>
          <img src={Delivery} alt="" />
          <p>Delivery</p>
        </div>
      </div>
      <div className={style.MidDetai}>
        <div className={style.MidDetLeft}>
         <p>Brand</p>
         <p>Model Name</p>
        </div>
        <div className={style.MidDetRight}>
          <h3>Apple</h3>
          <h3>Iphone 16 PRO Max</h3>
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
              <p>Display</p>
              <h3>UI-77TB772</h3>
            </div>
            <div className={style.DetWhite}>
              <p>Display</p>
              <h3>UI-77TB772</h3>
            </div>
            <div className={style.DetGray}>
              <p>Display</p>
              <h3>UI-77TB772</h3>
            </div>
            <div className={style.DetWhite}>
              <p>Display</p>
              <h3>UI-77TB772</h3>
            </div>
            <div className={style.DetGray}>
              <p>Display</p>
              <h3>UI-77TB772</h3>
            </div>
          </div>
        </div>
     <div className={style.DetPrice}>
     <h3>$1299.00</h3>
     <button className={style.Buy}>Buy It Now</button>
     <button className={style.ToCart}>Add To Cart</button>
   </div>
   </div>
  </div>
  );
};

export default Detailmain;