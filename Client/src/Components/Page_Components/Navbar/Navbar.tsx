import { useEffect, useState } from "react";
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
import UserLogo from "../../../assets/SVGs/user.svg";
import swal from "sweetalert2";

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

  const handleCartClick = () => {
    if (!user) {
      swal.fire({
        title: "Access Denied",
        text: "You need to be logged in to view your cart.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

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
          <li><Link to="/faq">FAQ</Link></li>
        </div>

        <div className={style.Right}>
          <div className={style.Search}>
            <Link to="/products"><img src={SearchLogo} alt="Search" /></Link>
          </div>

          {/* Cart Link */}
          <div className={style.Basket} onClick={handleCartClick}>
            {user ? (
              <Link to={`/user/${user._id}/cart`}>
                <img src={BasketLogo} alt="Basket" />
              </Link>
            ) : (
              <img src={BasketLogo} alt="Basket" className="cursor-pointer" />
            )}
          </div>

          {user ? (
            <Link to={`/user/${user._id}`} className="flex items-center gap-2">
              <img src={UserLogo} alt="User Icon" className="w-[20] h-[20]" />
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
