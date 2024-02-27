import React, { useEffect, useState } from 'react';
import { Axios } from '../App';
import { toast } from 'react-toastify';

const ProductWishlist = () => {

   const userId =localStorage.getItem("userId")
  

   const [products,setProducts] = useState([])






   const fetchWishlist = async ()=>{
     try{
        const response = await Axios.get(`api/users/${userId}/wishlists`)
        
        if(response.status === 200){
            setProducts(response.data.date)

            
        }
     }catch(error){
        console.log(error);
     }
   }

   useEffect(()=>{
     fetchWishlist()
   },[])


  //remove wishlist

  const removeFromWishlist = async(productId)=>{
  
       
    try{
        const response = await Axios.delete(`api/users/${userId}/wishlists`,{
            data:{productId}
        });

        

        if(response.status === 200){
             toast.success(response.data.message)
             await fetchWishlist()
        }
    }catch(error){

    }
  }



  return (
    <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
      <div className="flex flex-col justify-start items-start">
       
        <div className="mt-3">
          <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white">Favourites</h1>
        </div>
        <div className="mt-4">
          <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">{products.length} items</p>
        </div>
        <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
          {products.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="relative">
                <img className="hidden lg:block" src={item.image} alt="bag" />

                <button aria-label="close" className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute p-1.5 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400"onClick={()=>removeFromWishlist(item._id)}>
                  <svg className="fill-current" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 1L1 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 1L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

              </div>
              <div className="mt-6 flex justify-between items-center">
                <div className="flex justify-center items-center">
                  <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white">{item.title}</p>
                </div>
                <div className="flex justify-center items-center">
                
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-600 dark:text-white">Old Price: ${item.OldPrice}</p>
                <p className="text-gray-600 dark:text-white">Price: ${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductWishlist;






  
