import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import style from "./style.module.css";
import Logo from "../../../assets/Images/logo.svg";
import SearchLogo from "../../../assets/SVGs/search-normal.svg";
import BasketLogo from "../../../assets/SVGs/bag.svg";
import ProfileLogo from "../../../assets/SVGs/user.svg";
import authService from "../../../services/auth";
import { Sidebar } from "../Sidebar";

const Navbar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true); 

  const handleRegister = async () => {
    try {
      await authService.register({ name, surname, email, password, address, number });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoggedIn(true); 
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="container flex items-center">
      <div className={style.NavContainer}>
        <div className={style.Left}>
          <div className={style.Logo}><img src={Logo} alt="Logo" /></div>
          <div className={style.Burger}>
            <Sidebar />
          </div>
        </div>
        <div className={style.Middle}>
          <div className={style.NameText}><img src={Logo} alt="Logo" /></div>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li>Blog</li>
          <li>FAQ</li>
          <li>Contact Us</li>
        </div>
        <div className={style.Right}>
          <div className={style.Search}><img src={SearchLogo} alt="Search" /></div>
          <div className={style.Basket}><img src={BasketLogo} alt="Basket" /></div>
          {!isLoggedIn ? (
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className={style.DialogButton}>Login / Register</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
                </DialogHeader>
                {isLogin ? (
                  <>
                    <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={handleLogin}>Login</Button>
                    <Button onClick={() => setIsLogin(false)}>Don't have an account? Register here</Button>
                  </>
                ) : (
                  <>
                    <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                    <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <Input placeholder="Number" value={number} onChange={(e) => setNumber(e.target.value)} />
                    <Button onClick={handleRegister}>Register</Button>
                    <Button onClick={() => setIsLogin(true)}>Already have an account? Login here</Button>
                  </>
                )}
              </DialogContent>
            </Dialog>
          ) : (
            <div className={style.Profile}><img src={ProfileLogo} alt="Profile" /></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
