import { Route, Routes, useLocation } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Head2 from "./Head2";
import Footer from "./Component/Heder/Footer";
import Bennar from "./Banner";
import TechPhone from "./ProductSection/TechPhone";
import Laptop from "./ProductSection/Laptop";
import Login from "./Component/Heder/Login";
import Brand from "./Component/Heder/ProdcutList/Brand";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./Component/Heder/Signup";
import View from "./ProductSection/View";
import { DataProduct } from "./ProductSection/ProductData";
import Cart from "./ProductSection/Cart";
import axios from "axios";
import Adminlogin from "./AdminSide/Adminlogin";
import AdminHome from "./AdminSide/AdminHome";
import AddProduct from "./AdminSide/AddProduct";
import User from "./AdminSide/User";
import Allproduct from "./ProductSection/Allproduct";
import ProductWishlist from "./ProductSection/ProductWishlist";
import Productlist from "./AdminSide/Productlist";
import EditProduct from "./AdminSide/EditProduct";
import Success from "./ProductSection/Success";
import Order from "./AdminSide/Order";
import Oderdata from "./Component/Heder/Oderdata";
import Video from "./Component/Heder/ProdcutList/Video";
import EyeOder from "./AdminSide/EyeOder";
import Profile from "./userProfile/Profile";
import PriceCard from "./Component/Heder/ProdcutList/PriceCard";
import OfferCrad from "./Component/Heder/ProdcutList/OfferCrad";
import Otp from "./Component/Heder/ProdcutList/Otp";
import ResetPassword from "./Component/Heder/Resetpassword";
import ForgetPassword from "./Component/Heder/ForgetPassword";
import Error from "./Component/Error";
import Items from "./Component/Heder/Items";


// console.log( process.env.REACT_APP_API_URL,"hai");

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,

  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("jwt"),
  },
});

export const DataProductt = createContext();

function App() {
  const loc = useLocation();
  const ijdsk = loc.pathname.endsWith("/");
  const [product, setProduct] = useState(DataProduct);
  const [userData, setUserData] = useState([]);
  const [login, setLogin] = useState(false);
  const [newUser, setnewUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [sales, setSales] = useState([]);

  const [wishlist, setWishlist] = useState([]);
  const [wishStatus, setWishStatus] = useState(false);

  const userId = localStorage.getItem("userId");

  // wishList fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`api/users/${userId}/wishlists`);
        // console.log(response,"wwww");
        if (response.status === 200) {
          setWishlist(response.data.data);
          setWishStatus(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  //-> add to wishlist

  const addToWishlist = async (productId) => {
    try {
      await Axios.post(`api/users/${userId}/wishlists`, { productId });
      const response = await Axios.get(`api/users/${userId}/wishlists`);

      if (response.status === 200) {
        toast.success("Add to wishlist");
        setWishlist(response.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <DataProductt.Provider
        value={{
          product,
          setProduct,
          userData,
          setUserData,
          login,
          setLogin,
          newUser,
          setnewUser,
          cart,
          setCart,
          sales,
          setSales,
          addToWishlist,
        }}
      >
        <Head2 />
    
        <Routes>
          <Route path="/" element={<Bennar />} />
          <Route path="/Phone" element={<TechPhone />} />
          <Route path="/laptop" element={<Laptop />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/View/:id" element={<View />} />
          <Route path="/Cart/:id" element={<Cart />} />
          <Route path="/AdminLogin" element={<Adminlogin />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/Addproduct" element={<AddProduct />} />
          <Route path="/user/Block" element={<User />} />
          <Route path="/allProducts" element={<Allproduct />} />
          <Route path="/Wishlist" element={<ProductWishlist />} />
          <Route path="/ProductList" element={<Productlist />} />
          <Route path="/EditProduct/:id" element={<EditProduct />} />
          <Route path="/api/users/payment/success" element={<Success />} />
          <Route path="/Order/:id" element={<Order />} />
          <Route path="/viewOder" element={<Oderdata />} />
          <Route path="/EyeOder/:id" element={<EyeOder />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Otp" element={<Otp />} />
          <Route path="/password-reset" element={<ResetPassword />} />
          <Route path="/forgotpassword/:id/:token" element={<ForgetPassword/>} />
          <Route path="*" element={<Error />} />
        </Routes>
        {ijdsk && (
          <>
            <Brand />
            <Video />
            <PriceCard />
            <OfferCrad />
            <Items />
          </>
        )}
      </DataProductt.Provider>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
