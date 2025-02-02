import React from 'react'
import style from "./style.module.css"
import Logo from "../../../assets/Images/logo.svg"
import SearchLogo from "../../../assets/SVGs/search-normal.svg"
import BasketLogo from "../../../assets/SVGs/bag.svg"
import ProfileLogo from "../../../assets/SVGs/user.svg"
import Burger from "../../../assets/SVGs/burger-menu-svgrepo-com.svg"
import { SidebarTrigger } from '../../components/ui/sidebar'
import { Sidebar } from '../Sidebar'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='container'>
        <div className={style.NavContainer}>
            <div className={style.Left}>
             <div className={style.Logo}> <img src={Logo} alt="" /></div>
              <div className={style.Burger}><Sidebar/></div>

            </div>
            <div className={style.Middle}>
          
             <div  className={style.NameText}> <img src={Logo} alt="" /></div>
            <li>Home</li>
            <li><Link to="/products">Products</Link></li>
            <li>Blog</li>
            <li>FAQ</li>
            <li>Contact Us</li>
            </div>
            <div className={style.Right}>
                <div className={style.Search}><img src={SearchLogo} alt="" /></div>
                <div className={style.Basket}><img src={BasketLogo} alt="" /></div>
                <div className={style.Profile}><img src={ProfileLogo} alt="" /></div>
            </div>
        </div>
    </div>
  )
}

export default Navbar