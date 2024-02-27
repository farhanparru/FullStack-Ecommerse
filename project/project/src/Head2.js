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
import online from '../src/assets/t Online Shop Free Logo.png'
import { Axios } from './App';
import { toast } from 'react-toastify';
import cart from '../src/assets/Animation  cart.gif'
import './Head.css'


function Head2() {
  const Navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const isLoggedIn = userId !== null; // Check if user is logged in

  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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

  const handleLogin2 = () => {
    Navigate("/AdminLogin");
  };

  return (
    <div className="relative">
      <Navbar expand="lg" className='bg-cyan-800 px-1 text-white font-thin'>
        <Container>
          <Navbar.Brand href="#" className="brand-name">
            <img src={online} alt="Logo" style={{ width: '90px', height: 'auto', animation: 'logoAnimation 2s infinite alternate', marginLeft:"-282.5%" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className='' />
          <Navbar.Collapse className='w-full flex flex-col gap-2 justify-between items-center md:flex-row '>
            <div className='flex justify-center md:items-center flex-col md:gap-4 items-start w-full px-4 gap-3 md:flex-row'>
              <Link to="/"><button className='hover:text-yellow-500 text-opacity-50 border px-3 rounded-lg text-lg text-white'>Home</button></Link>
              <Link to="/laptop"><button className='hover:text-yellow-500 text-opacity-50 border px-2 rounded-lg text-lg text-white'>Laptops</button></Link>
              <Link to="/Phone"><button className='hover:text-yellow-500 text-opacity-50 border px-2 rounded-lg text-lg text-white'>Smartphone</button></Link>
              <Link to="/allProducts"><button className='hover:text-yellow-500 text-opacity-50 border px-2 rounded-lg text-lg text-white'>All Products</button></Link>
            </div>

            <div className='flex justify-between w-full md:w-auto items-center p-4 gap-4' style={{gap:"5.5rem!important"}}>
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-1">
                    <img onClick={()=> Navigate(`/Cart/${userId}`)} src={cart} title='Cart'></img>
                    <Link to="/Wishlist" className="ml-4">
                      <FaRegHeart className="text-3xl cursor-pointer rounded-full text-red-500" title="Wi shlist" />
                    </Link>
                  </div>
                  <div className="avatar gap-2">
                    <div className="w-10 mt-0 md:mt-8 mask mask-squircle">
                    <img onClick={handleLogin2} src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1702202454~exp=1702203054~hmac=9912f587eff164dd6dbaf25149db650afc3800927e1f67b62555f6a6d929f2f4" title='Admin' />
                    </div>
                  </div>
                  <NavLink onClick={handleLogout} className='text-white text-2xl'>
                    <FaSignOutAlt title='Logout' />
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink onClick={HandleLogin}><PiSignIn className='text-white text-2xl' title='Login' /></NavLink>
                </>
              )}
            </div>


            <form className="absolute top-full left-0 max-w-md mx-auto w-full md:w-auto relative">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex-shrink-0 p-3">
            <BiSearch className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            id="searchInput"
            className="flex-grow p-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
            placeholder="Search items..."
            aria-label='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>


          </Navbar.Collapse>
        </Container>
      </Navbar>

  
      {searchTerm && (
        <div className='search-results absolute top-full left-0 bg-white border border-gray-300 rounded-b-md shadow-md'>
          {searchResults.map((product) => (
            <div className='product-item' key={product._id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
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
