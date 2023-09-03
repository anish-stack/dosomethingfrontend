import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import menu from "./menu.png"
import close from "./close.png"
import cart from  "./shopping-cart.png"
import user from "./user.png"
import './navbar.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const [userAvatar, setUserAvatar] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const handleMobileMenuToggle = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const avatar = localStorage.getItem('avatar');

    if (avatar) {
      setUserAvatar(avatar);
    }
  }, []);

  const handleLogout = () => {
    if (token) {
      
      window.location.href="/login"; // Use push() to navigate within React Router

    } else {
        // Token is not present, show message and redirect
        toast.error('Please login first.');
        setTimeout(()=>{
          window.location.href="/login"; // Redirect to login page

        },3000)
    }
};


  const defaultAvatarSvg = user


  return (
    <>
    <header>
    <h3 className="logo">DOSOMETHINGS <sub>.in</sub></h3>
    <nav  className={isMobileMenuOpen ? 'show' : ''}>
        <ul className='navitems'>
            <li><Link to="/">home</Link></li>
            <li><Link to="/LongProduct">product</Link></li>
            <li><Link to="/Category">Category</Link></li>
            <li><Link to="/About">about</Link></li>
            <li><Link to="/Contact">contact</Link></li>
            <li className='btn'><Link to="/register">Register</Link></li>

            <li><Link to="/cart"><img src={cart} width="30px" alt="" /></Link></li>
            <li className="imguser">
                <Link to="#">
                  <div className='user-trigger'>
                    
                  </div>
                    <img src={user} width="30px" alt="" />
                    <ul className="user">
                        <li><Link to="/profile"> Profile </Link></li>
                        <li><Link to="/login"> Login </Link></li>
                        <li  onClick={handleLogout}> <Link to="/login" >SignOut</Link></li>
                    </ul>
                </Link>
            </li>
        </ul>
    </nav>
    <ul className="mobile-icons">
        <li onClick={handleMobileMenuToggle}><Link to="#"><img src={menu} width="40px" alt="" /></Link></li>
        <li onClick={handleMobileMenuToggle}><Link to="#"><img className="close" src={close} width="40px" alt="" /></Link></li>
    </ul>
</header>

<ToastContainer/>
</>
  );
}
