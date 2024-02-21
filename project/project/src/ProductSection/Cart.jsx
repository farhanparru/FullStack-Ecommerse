import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../App";
import { toast } from "react-toastify";
import axios from "axios";




const Cart = () => {

  const[products,setProducts]=useState([])
  const {id} = useParams()
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()



    // feching cart products
  const fetchCart = async()=>{
     try{
       const response = await Axios.get(`http://localhost:3000/api/users/${userId}/cart`)
           if(response.status === 200){
              setProducts(response.data.data)
           }
     }catch(error){
        console.log(error);
     }
  }


    useEffect(()=>{
      fetchCart()
    },[])



      // handle product quntity

      const handleQuantity = async (cartID,quantityChange)=>{
          const data = {id: cartID,quantityChange}
          // console.log(data,"oo");
          
          try{
             await Axios.put(`/api/users/${id}/cart`,data)
             const response = await Axios.get(`/api/users/${id}/cart`)

             console.log(data,"kkk");
             
            
             if(response.status === 201){
                return fetchCart()
             }
          }catch (error){
            console.log(error);
          }
      };



      //handle product remove

       const handleRemoveItem = async (id)=>{
          try{
            const productId = id;
            const response =  await Axios.delete(`/api/users/${userId}/cart`,{
            data:{productId:productId},
            })

            fetchCart()
            console.log(response,"ggg");
          }catch(error){
             console.log(error);
             toast.error('Error removing product from a cart')
          }
       }






  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl font-bold my-4">Shopping Cart</h1>
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigate('/payment')}>
            Checkout
          </button>
        </div>
        <div className="mt-8">
          {products && products.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row border-b border-gray-400 py-4">
            
              <div className="flex-shrink-0">
                <img src={item.image} alt="Product image" className="w-32 h-32 object-cover" />
              </div>
              <div className="mt-4 md:mt-0 md:ml-6">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="mt-2 text-gray-600">Price:${item. price}</p>
                <p className="mt-2 text-gray-600">OldPrice:${item.OldPrice}</p>
                <div className="mt-4 flex items-center">
                  <span className="mr-2 text-gray-600">Quantity:</span>

 

            <div className="flex items-center">
            <button 
         className="bg-gray-200 text-gray-700 rounded-l-lg px-3 py-1 hover:bg-gray-300 bg-primary"
         onClick={() => handleQuantity(item._id, -1)} >
         <i className="fas fa-minus"></i>
       </button>

      <span className="mx-2 text-gray-600">{item.quantity}</span>

       <button   className="bg-gray-200 text-gray-700 rounded-r-lg px-3 py-1 hover:bg-gray-300 bg-dark"
       onClick={() => handleQuantity(item._id,1)} >
        <i className="fas fa-plus"></i>
      </button>
      </div>


                  </div>
                  <span className="ml-auto font-bold">${item.price}</span>
                  
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" style={{ marginLeft: '400px' }} onClick={()=>handleRemoveItem(item._id)}>
                   <i className="fas fa-trash" style={{ marginRight: '10px' }}></i>
                   Delete
                  </button>
                   
                </div>
                
              </div>
              
            
          ))}
        </div>
        <div className="flex justify-end items-center mt-8">
          <span className="text-gray-600 mr-9" style={{fontSize:"larger"}}>₹Subtotal:</span>
          <span className="text-xl font-bold">
          
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
