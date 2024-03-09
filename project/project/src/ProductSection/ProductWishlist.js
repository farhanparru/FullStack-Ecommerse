import React, { useEffect, useState } from 'react';
import { Axios } from '../App';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
const ProductWishlist = () => {
  const userId = localStorage.getItem("userId")
  const [products, setProducts] = useState([])

  console.log(products,"gg");

  const fetchWishlist = async () => {
    try {
       const response = await Axios.get(`api/users/${userId}/wishlists`);
       
       if (response.status === 200) {
           setProducts(response.data.date);
           
       }
    } catch (error) {
       console.log(error);
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
   try {
       const response = await Axios.delete(`api/users/${userId}/wishlists`, {
           data: { productId }
       });

       if (response.status === 200) {
            toast.success(response.data.message);
            await fetchWishlist();
       }
   } catch (error) {
       console.log(error);
   }
 }

 return (
   <div className="mx-auto container px-4 md:px-5 2xl:px-0 py-12 flex justify-center items-center gri">
     <div className="flex flex-col justify-start items-start grid gap-4">
       <div className="mt-3">
         <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white">My Favorites</h1>
       </div>
       <div className="mt-4 flex items-center">
         <FontAwesomeIcon icon={faShoppingBasket} className="text-3xl mr-2 text-gray-600 dark:text-white" />
         <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white ">{products?.length || 0} items</p>

       </div>
       {products && products.length !== 0 ? (
         <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
           {products.map((item, index) => (
             <div key={index} className="flex flex-col w-full h-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
               <div className="relative">
                 <img className="hidden lg:block" src={item.image} alt="bag" />
                 <button aria-label="close" className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute p-1.5 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400 rounded-full" onClick={() => removeFromWishlist(item._id)}>
                   <svg className="fill-current" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M13 1L1 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                     <path d="M1 1L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                   </svg>
                 </button>
               </div>
               <div className="mt-6">
                 <h2 className="text-xl lg:text-2xl font-semibold leading-6 text-gray-800 dark:text-white">{item.title}</h2>
                 <div className="flex justify-between items-center mt-2">
                   <del className="text-gray-600 dark:text-white text-xl">Old Price: ₹{item.OldPrice}</del>
                   <p className="text-gray-600 dark:text-white text-xl">Price: ₹{item.price}</p>
                 </div>
               </div>
             </div>
           ))}
         </div>
         ) : (
         <p className="text-gray-600 dark:text-white mt-6">Your wishlist is empty.</p>
       )}
     </div>
   </div>
 );
}

export default ProductWishlist;
