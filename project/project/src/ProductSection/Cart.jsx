import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../App";
import { toast } from "react-toastify";


const userId = localStorage.getItem('userId')




const Cart = () => {

  const[products,setProducts]=useState([])

  // console.log(products,'proooi')
  const {id} = useParams()
  const navigate = useNavigate()



    // feching cart products
  const fetchCart = async()=>{
     try{
       const response = await Axios.get(`http://localhost:3000/api/users/${userId}/cart`)
      //  console.log(response,"res");
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
            //  console.log(response)
             if(response){
              // setQuantityValue(response.data.data)
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
           
            const response =  await Axios.delete(`http://localhost:3000/api/users/${userId}/cart`,{
            
            data:{productId:productId},
            })
         
            fetchCart()
            // console.log(response,"ggg");
          }catch(error){
             console.log(error);
             toast.error('Error removing product from a cart')
          }
       }

     //payment  Hnadle

     const handleChekout = async ()=>{
       try{
        // console.log(userId,"ll");

        const response = await  Axios.post(`http://localhost:3000/api/users/${userId}/payment`)

        console.log(response.data);


        if(response.status === 200){
           const url = response.data.url
           const confermation = window.confirm('Payment session created. Redirecting to the payment gateway.Continue?')
           if(confermation) window.location.replace(url)
        }
       }catch(error){
          console.log(error);
       }
     };

  const calculateTotal =  (cartItem)=>{
    return cartItem.reduce((total,item)=>total + item.productsId.price * item.quantity,0).toFixed(2)
  }



     return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl font-bold my-4">Shopping Cart</h1>
          
        </div>
        <div className="mt-8">
          {products && products.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row border-b border-gray-400 py-4">
              <div className="flex-shrink-0">
                <img src={item.productsId.image} alt="Product image" className="w-32 h-32 object-cover" />
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold">{item.productsId.title}</h2>
                    <p className="mt-2 text-gray-600">Price: ₹{item.productsId.price}</p>
                    <del className="mt-2 text-gray-600">Old Price: ₹{item.productsId.OldPrice}</del>
                  </div>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleRemoveItem(item.productsId._id)}>
                    <i className="fas fa-trash" style={{ marginRight: '10px' }}></i>
                    Delete
                  </button>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="mr-2 text-gray-600">Quantity:</span>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-200 text-gray-700 rounded-l-lg px-3 py-1 hover:bg-gray-300 bg-primary"
                      onClick={() => handleQuantity(item._id, -1)}>
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className="mx-2 text-gray-600">{item.quantity}</span>
                    <button
                      className="bg-gray-200 text-gray-700 rounded-r-lg px-3 py-1 hover:bg-gray-300 bg-dark"
                      onClick={() => handleQuantity(item._id, 1)}>
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center mt-8">
         
          <span className="text-xl font-bold">
       
          </span>
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{marginLeft:"47vh"}}>
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">₹129.99</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">₹4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Subtotal</p>
            <div>
              <p className="mb-1 text-lg font-bold"> ₹{calculateTotal(products)} </p>
              <p className="text-sm text-gray-700">including GST</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={()=>handleChekout()}>Check out</button>
        </div>
      </div>
    );
  };
  
  export default Cart;