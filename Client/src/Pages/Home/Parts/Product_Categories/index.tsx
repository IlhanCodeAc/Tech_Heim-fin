import style from "./style.module.css"
import Phone from "../../../../assets/Images/image.png"
import Laptop from "../../../../assets/Images/laptop.png"
import Iphone from "../../../../assets/Images/phone.png"
import Dualshock from "../../../../assets/Images/gaming.png"
import Watch from "../../../../assets/Images/Watch.png"
import { Link } from "react-router-dom"

const HomeCats = () => {
  return (
    <div className='container'>
        <div className={style.CatsContainer}>
          <div className={style.Category}>
              <img src={Phone} alt="" />
              <p className={style.CategoryName}>Accesoires</p>
          </div>
          <Link to="/products?search=laptop">
          <div className={style.Category}>
              <img src={Laptop} alt="" />
              <p className={style.CategoryName}>Laptops</p>
          </div>
          </Link>
          <Link to="/products?category=67b2efc5f3a5632af66b3dbc">
          <div className={style.Category}>
              <img src={Dualshock} alt="" />
              <p className={style.CategoryName}>Gaming</p>
          </div>
          </Link>
          <Link to="/products?category=67aa5d83cda20f8d6126c0eb">
          <div className={style.Category}>
              <img src={Iphone} alt="" />
              <p className={style.CategoryName}>Phones</p>
          </div>
          </Link>
          <Link to="/products?category=67aa72c81ed019555dfa6e02">
          <div className={style.Category}>
              <img src={Watch} alt="" />
              <p className={style.CategoryName}>Watches</p>
          </div>
          </Link>

        </div>
    </div>
  )
}

export default HomeCats