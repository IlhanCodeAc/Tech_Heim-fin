import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import Logo from "../../../assets/Images/logo.svg";
import SearchLogo from "../../../assets/SVGs/search-normal.svg";
import BasketLogo from "../../../assets/SVGs/bag.svg";
import style from "./style.module.css";
import LoginDialog from "./loginDialogue";
import RegisterDialog from "./registerDialogue";
import authService from "../../../services/auth";
import { User } from "../../../types";
import UserLogo from "../../../assets/SVGs/user.svg"

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getCurrentUser();
        setUser(response.data.user); 
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container flex items-center">
      <div className={style.NavContainer}>
        <div className={style.Left}>
          <div className={style.Logo}>
            <img src={Logo} alt="Logo" />
          </div>
          <div className={style.Burger}>
            <Sidebar />
          </div>
        </div>

        <div className={style.Middle}>
          <div className={style.NameText}>
            <img src={Logo} alt="Logo" />
          </div>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li>Blog</li>
          <li>FAQ</li>
          <li>Contact Us</li>
        </div>

        <div className={style.Right}>
          <div className={style.Search}>
          <Link to="/products"><img src={SearchLogo} alt="Search" /></Link>  
          </div>
          <div className={style.Basket}>
            <img src={BasketLogo} alt="Basket" />
          </div>

          {user ? (
            <Link to={`/user/${user._id}`} className="flex items-center gap-2">
              <img 
                src={UserLogo} 
                alt="User Icon" 
                className="w-[20] h-[20] "
              />
            </Link>
          ) : (
            <>
              <LoginDialog />
              <RegisterDialog />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
