import React from 'react'
import style from "./style.module.css"
import Phone from "../../../../assets/Images/image.png"
import Laptop from "../../../../assets/Images/laptop.png"
import Iphone from "../../../../assets/Images/phone.png"
import Dualshock from "../../../../assets/Images/gaming.png"
import Watch from "../../../../assets/Images/Watch.png"

const HomeCats = () => {
  return (
    <div className='container'>
        <div className={style.CatsContainer}>
          <div className={style.Category}>
              <img src={Phone} alt="" />
              <p className={style.CategoryName}>Accesoires</p>
          </div>
          <div className={style.Category}>
              <img src={Laptop} alt="" />
              <p className={style.CategoryName}>Laptops</p>
          </div>
          <div className={style.Category}>
              <img src={Dualshock} alt="" />
              <p className={style.CategoryName}>Gaming</p>
          </div>
          <div className={style.Category}>
              <img src={Iphone} alt="" />
              <p className={style.CategoryName}>Phones</p>
          </div>
          <div className={style.Category}>
              <img src={Watch} alt="" />
              <p className={style.CategoryName}>Watches</p>
          </div>
        </div>
    </div>
  )
}

export default HomeCats