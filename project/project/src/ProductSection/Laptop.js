import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';


import axios from 'axios';

const Laptop = () => {
  const navigate = useNavigate()
  const [products,setProducts]=useState([])
  
  useEffect(()=>{
    const fetchProducts = async()=>{
       try{
         const response= await axios.get(`http://localhost:3000/api/users/products`)
          // console.log(response.data.data,"hai");
         
   

         if(response.status===200){
          //  toast.success("product fetched successfully",{
          //   toastId: 'success1',
          // })
          setProducts(response.data.data)

           
         }
       }catch (error){
       console.log(error);
       }
    }

    fetchProducts()
  },[])





//  console.log(products)
  // Filter products based on category 'laptops'
  const laptopProducts = products.filter((item) => item.category === 'laptop');
  // console.log(laptopProducts)



   const viewhandle=(id)=>{
    // console.log(id,"hia");
    navigate(`/View/${id}`)
   }


  


  return (
    <div className='w-full h-auto flex gap-10 flex-wrap p-14'>
      {laptopProducts.map((item) => (
        <div key={item.id} className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transform transition duration-300 ease-in-out hover:scale-105">
          <figure>
            <img src={item.image} alt="Note" />
          </figure>
          <div className="card-body p-4">
            <h2 className="card-title text-xl font-semibold">{item.title}</h2>
            <h2 className="card-title text-xl font-semibold">{item.category}</h2>
            <del><span className="font-bold text-gray-500">₹{item.OldPrice}</span></del>
            <p className='font-bold text-green-500'>₹{item.price}</p>
       
            <div className="card-actions justify-end mt-4">
            <div className="rating rating-lg">
            <input type="radio" name="rating-0" className="mask mask-star-2 bg-orange-400" />
         <input type="radio" name="rating-0" className="mask mask-star-2 bg-orange-400" checked />
         <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
         <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
            </div>
            
              <button className="btn btn-primary"
             onClick={()=> viewhandle(item._id)}
              >Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Laptop;
