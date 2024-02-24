import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faHome, faSignInAlt, faShoppingCart, faUser, faHeart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../src/navabar.css';
import { Link, useNavigate } from 'react-router-dom';

const Bar = () => {
  const [active, setActive] = useState("nav_menu");
  const [toggleIcon, setToggleIcon] = useState('nav_toggler');
  
  const Toggle = () => {
    setActive(active === 'nav_menu' ? 'nav_menu   nav_active' : 'nav_menu');
    setToggleIcon(toggleIcon === 'nav_toggler' ? 'nav_toggler toggle' : 'nav_toggler');
  };

  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const isLoggedIn = userId !== null;



  const handleLogout = async () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    localStorage.removeItem('admin_Token');
    localStorage.removeItem('userId');
  }


  return (
    <nav className='nav'>
      
      <a href='#' className='nav_brand'>Logo</a>

      <div className="nav_icons">
          <Link to="/laptop"><li><FontAwesomeIcon icon={faLaptop} className='nav_icon' />laptop</li></Link>
       <Link to="/Phone"><li><FontAwesomeIcon icon={faMobileAlt} className='nav_icon' />SmartPhone</li></Link> 
      </div>
   
      <ul className={active}>
       <Link to="/"> <li className='nav_item'><a href='#' className='nav_icon'><FontAwesomeIcon icon={faHome} className='nav_icon' /> Home</a></li></Link>

        <li className='nav_item'><a href='#' className='nav_icon'><FontAwesomeIcon icon={faSignInAlt} className='nav_icon' /> Login</a></li>
        <li className='nav_item'><a href='#' className='nav_icon'><FontAwesomeIcon icon={faShoppingCart} className='nav_icon' /> Cart</a></li>
       <Link to="/AdminLogin"> <li className='nav_item'><a href='#' className='nav_icon'><FontAwesomeIcon icon={faUser} className='nav_icon' /> Admin</a></li></Link>
        <li className='nav_item'><a href='#' className='nav_icon'><FontAwesomeIcon icon={faHeart} className='nav_icon' /> Wishlist</a></li>
        <li className='nav_item'><a href='#' className='nav_icon'><FontAwesomeIcon icon={faSignOutAlt} className='nav_icon' /> Logout</a></li>
      </ul>
      
      <div onClick={Toggle} className={toggleIcon}>
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
      </div>
    </nav>
  );
};

export default Bar;
