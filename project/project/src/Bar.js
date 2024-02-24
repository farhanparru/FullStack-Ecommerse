import React,{useState} from 'react'
import '../src/navabar.css'

const Bar = () => {
  const [active,setActive]=useState("nav_menu")
  const [toggleIcon,setToggleIcon]=useState('nav_toggler')
  const Toggle = ()=>{
    active  === 'nav_menu' 
    ? setActive('nav_menu   nav_active')
    : setActive('nav_menu')

    toggleIcon === 'nav_toggler' 
    ?setToggleIcon('nav_toggler toggle')
    :setToggleIcon('nav_toggler')
  }


  return (
   <nav className='nav'>
   <a href='#' className='nav_brand'>Frahan</a>
   
   <ul className={active}>
   <li className='nav_item'><a href='#' className='nav_link'>Home</a></li>
   <li className='nav_item'><a href='#' className='nav_link'>Login</a></li>
   <li className='nav_item'><a href='#' className='nav_link'>Cart</a></li>
   <li className='nav_item'><a href='#' className='nav_link'>Admin</a></li>
   <li className='nav_item'><a href='#' className='nav_link'>Wishlist</a></li>
   <li className='nav_item'><a href='#' className='nav_link'>Logout</a></li>
   </ul>
   <div onClick={Toggle} className={toggleIcon}>
    <div className='line1'></div>
    <div className='line2'></div>
    <div className='line3'></div>
    </div>
   </nav>
  )
}

export default Bar
