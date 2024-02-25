import React, { useEffect, useState } from 'react';
import { Axios } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';

const ProductWishlist = () => {

   const userId =localStorage.getItem("userId")
  

   const [products,setProducts] = useState([])




   const fetchWishlist = async ()=>{
     try{
        const response = await Axios.get(`api/users/${userId}/wishlists`)
   

       
   
        
        if(response.status === 200){
            setProducts(response.data.date)

            console.log(response.data.date,"lll");
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
    console.log(productId,'kk');
       
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
    <div>
    
    <section className="flex items-center py-10 lg:py-20 bg-gray-100 dark:bg-gray-800">
    <div className="px-4 mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-500 dark:text-blue-300">My Favorite Products</h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((item, index) => (
                <div key={index} className="relative overflow-hidden bg-white shadow-md rounded-xl dark:bg-gray-700">
                    <div className="relative overflow-hidden">
                        <div className="mb-5 overflow-hidden">
                            <img className="object-cover w-full h-60 sm:h-72 hover:scale-105 transition-transform duration-300" src={item.image} alt={item.title} />
                        </div>
                        <button className="absolute top-0 left-0 p-3 bg-blue-500 rounded-l-none hover:bg-blue-600 rounded-b-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
                            </svg>
                        </button>
                    </div>
                    <a href="#">
                        <h3 className="px-5 mb-4 text-lg font-bold dark:text-white">{item.title}</h3>
                    </a>
                    <div className="flex justify-between items-center px-5 pb-3">
                        <div>
                            <p className="text-lg font-bold text-blue-500 dark:text-blue-300">${item.OldPrice}</p>
                            <span className="block -mt-1 text-xs font-semibold text-gray-400 line-through">${item.price}</span>
                        </div>
                        <button className="text-sm text-white transition-all bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-xl">
                            Add To Cart
                        </button>
                    </div>
                    <button className="p-3 bg-blue-500 rounded-l-none hover:bg-blue-600 rounded-b-xl bg-danger" onClick={()=>removeFromWishlist(item._id)}>
                        <FontAwesomeIcon  icon={faTrash} className="text-white" />
                    </button>
                </div>
            ))}
        </div>
    </div>
</section>


    </div>
);
}

export default ProductWishlist;