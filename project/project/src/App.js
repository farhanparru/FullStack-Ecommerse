  import { Route, Routes, useLocation } from 'react-router-dom';
  import { createContext, useState } from 'react';
  import Head2 from './Head2';
  import Footer from './Component/Heder/Footer';
  import Bennar from './Banner';
  import TechPhone from './ProductSection/TechPhone';
  import Laptop from './ProductSection/Laptop';
  import Login from './Component/Heder/Login';
  import Brand from './Component/Heder/ProdcutList/Brand';
  import { ToastContainer } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css';
  import Signup from './Component/Heder/Signup';
  import NewCom from './Component/Heder/ProdcutList/NewCom';
  import NewCom2 from './Component/Heder/ProdcutList/NewCom2';
  import View from './ProductSection/View';
  import { DataProduct } from './ProductSection/ProductData';
  import Scree from './ProductSection/Scree';
  import Cart from './ProductSection/Cart';
  import  axios from 'axios' 
  import Adminlogin from './AdminSide/Adminlogin';
  import AdminHome from './AdminSide/AdminHome';     
  import AddProduct from './AdminSide/AddProduct';
  import Payment from './ProductSection/payment';
import User from './AdminSide/User';
import Allproduct from './ProductSection/Allproduct';

  // console.log( process.env.REACT_APP_API_URL,"hai");

   export const Axios =  axios.create({
        baseURL:  process.env.REACT_APP_API_URL,
        
        headers:{
          "Content-Type":"application/json",
          Authorization:localStorage.getItem('jwt')
        }
   })   
   
 
 






  export const DataProductt = createContext();



  function App() {
    const loc=useLocation()
    const  ijdsk=loc.pathname.endsWith("/")
    const [product, setProduct] = useState(DataProduct);
    const [userData,setUserData] = useState([])
    const [login,setLogin]=useState(false)
    const [newUser,setnewUser]=useState([])
    const [cart,setCart]=useState([])
    const [sales,setSales] = useState([])

    return (
      <div>   
   
      <DataProductt.Provider value={{ product, setProduct , userData, setUserData,login,setLogin,newUser,setnewUser,cart,setCart,sales,setSales}}>
       <Head2/>
        <Routes>
          <Route path='/' element={<Bennar/>} />
          <Route path='/Phone' element={<TechPhone/>}/>
          <Route path='/laptop' element={<Laptop/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/View/:id' element={<View/>}/>
          <Route path='/Cart/:id' element={<Cart/>}/>
          <Route path='/AdminLogin' element={<Adminlogin/>}/>
          <Route path='/AdminHome' element={<AdminHome/>}/>
          <Route path='/Addproduct' element={<AddProduct/>}/>
          <Route path='/payment' element={<Payment/>}/>
          <Route path='/user' element={<User/>}/>
          <Route path='/allProducts' element={<Allproduct/>}/>
        </Routes>
        {
        ijdsk&&
          <>
        <Brand/>
        <NewCom/>
        <NewCom2/>
        <Scree/>
        
        </>
        
        }
        
        </DataProductt.Provider>
       <ToastContainer/>
       <Footer/>
      
      </div>
    );
  }

  export default App;
