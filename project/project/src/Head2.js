import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PiSignIn } from "react-icons/pi";
import { FaSignOutAlt } from 'react-icons/fa'
import { NavLink } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi'
import { Axios } from './App';
import { toast } from 'react-toastify';
import cart from '../src/assets/Animation  cart.gif'
import './Head.css'
import Brand from '../src/assets/logo brand.png'
import profile from './assets/userprofilen.webp'
import axios from 'axios';


function Head2() {
  const Navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const isLoggedIn = userId !== null; // Check if user is logged in

  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [userData,setUserdata]= useState({})
 

  const getUser = async ()=>{
    try{

      const response =  await axios.get('http://localhost:3000/Login/sucess',{withCredentials:true});
         setUserdata(response.data.user)
        //  console.log(response.data,"hhh");
    }catch(error){
        console.log(error,"error");
    }
  }

 useEffect(()=>{
    getUser()
 })


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:3000/api/users/allProducts');
        if (response.status === 200) {
          setProducts(response.data.data);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredProducts);
  }, [searchTerm, products]);

  const handleLogout = async () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    localStorage.removeItem('admin_Token');
    localStorage.removeItem('userId');
  };

  const HandleLogin = () => {
    Navigate("/Login");
  };

 
  return (
    <div className="relative">
      <Navbar expand="lg" className='bg-cyan-800 text-white font-thin' style={{ height: '80px', width: '100%', position: 'fixed', top: '2', left: '2', zIndex: '1000' }}>
        <Container className="flex justify-between items-center">
          <Navbar.Brand href="#" className="brand-name">
            <img src={Brand} alt="Logo" style={{ width: '90px', height: 'auto', animation: 'logoAnimation 2s infinite alternate', marginLeft:"-282.5%" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className='' />
          <Navbar.Collapse className='w-full flex flex-col md:flex-row gap-2 md:gap-4 md:justify-end'>
            {/* Navbar Links */}
            <div className='flex justify-center md:items-center flex-col md:flex-row'>
              <Link to="/"><button className='nav-link' style={{ padding: '10px 20px', fontSize: '16px', color: 'white', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}>Home</button></Link>
              <Link to="/laptop"><button className='nav-link' style={{ padding: '10px 20px', fontSize: '16px', color: 'white', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}>Laptops</button></Link>
              <Link to="/Phone"><button className='nav-link' style={{ padding: '10px 20px', fontSize: '16px', color: 'white', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}>Smartphone</button></Link>
              <Link to="/allProducts"><button className='nav-link' style={{ padding: '10px 20px', fontSize: '16px', color: 'white', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}>All Products</button></Link>
            </div>

        
<div>
<div className='flex justify-end items-center p-4 gap-4'> {/* Updated: justify-end */}
  {isLoggedIn ? (
    <div className="flex items-center gap-1">
      <img onClick={()=> Navigate(`/Cart/${userId}`)} src={cart} title='Cart' style={{width:"95px",height:"95px"}}></img>
      <Link to="/Wishlist" className="ml-4">
        <FaRegHeart className="text-3xl cursor-pointer rounded-full text-red-500" title="Wi shlist" />
      </Link>
    </div>
    ) : null}
      
    {isLoggedIn ? (
      <NavLink onClick={handleLogout} className='user-action-btn' style={{ padding: '10px 20px', fontSize: '16px', color: 'white', backgroundColor: 'transparent', border: '1px solid white', borderRadius: '5px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
        <FaSignOutAlt style={{ marginRight: '5px' }} /> Logout
      </NavLink>
    ) : (
      <NavLink onClick={HandleLogin} className='user-action-btn' style={{ padding: '10px 20px', fontSize: '16px', color: 'white', backgroundColor: 'transparent', border: '1px solid white', borderRadius: '5px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
        <PiSignIn style={{ marginRight: '5px' }} /> Login
      </NavLink>
    )}
  </div>
</div>
    
 

          </Navbar.Collapse>
          <div style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)' }}>
  <Link to="/Profile"><img src={profile} style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></Link>
</div>

        </Container>
      </Navbar>

      {/* Search Results */}
      {searchTerm && (
        <div className='search-results absolute flex flex-wrap top-full left-0 justify-center items-center gap-3 backdrop-blur-xl border border-gray-300 rounded-b-md p-2 z-[999] w-full h-fit   oveshadow-md'>
          {searchResults.map((product) => (
            <div className='product-item overflow-hidden p-3 rounded border border-black h-96 ' key={product._id}>
              <img src={product.image} alt={product.title} className='w-52 h-52' />
              <h3 className='text-xl'>{product.title}</h3>
              <p>Price: {product.price}</p>
              {product.oldPrice && <p>Old Price: {product.oldPrice}</p>}
              <button onClick={() => { Navigate(`/View/${product._id}`); setSearchTerm(""); }}>View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Head2;