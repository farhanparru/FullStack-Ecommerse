import React, { useEffect, useState } from 'react'
import { Axios } from '../App'
import { useParams } from 'react-router-dom'
import cancle from  '../assets/cancle.png'
import success from '../assets/Animation gif.gif'
const EyeOder = () => {

    const [eyeProducts,setEyeProducts]=useState([])
    const[eyeTime,setTime]=useState(null)
    const [data,setDate]=useState(null)
    const [totalamount,setTotalAmount]=useState(null)
   


    const {id}=useParams()


   useEffect(()=>{
    const handleEyeOder = async()=>{
        
        try{

            const response = await Axios.get(`http://localhost:3000/api/admin/viewOrder/${id}`)
           
        //   console.log(response,"kkk");

            if(response.status === 200){
                setEyeProducts(response.data.orders.products)
                setTime(response.data.orders.time)
                setDate(response.data.orders.date)
                setTotalAmount(response.data.orders.total_amount)
              
            }
         }catch(error){
             console.log(error);
         }
        }
         handleEyeOder()
        },[id])
    
        
       
    useEffect(()=>{
        const CancleOrder = async()=>{
             
        }
    })
          



  return (
    <div>
   <section class="py-24 relative">
    <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <div class="bg-white shadow-xl rounded-lg overflow-hidden">
            <img src={success} className="mx-auto mt-8" style={{ width: "200px", height: "auto" }} />
            <h2 class="font-manrope font-bold text-4xl leading-10 text-black text-center py-6 bg-gray-100 border-b border-gray-200">Payment Successful</h2>
            <p class="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">Thanks for making a purchase you can check our order summary from below</p>
            <div class="main-box">
                        {eyeProducts.map((item,index) => (
                            <div class="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                                <div class="img-box max-lg:w-full">
                                    <img alt="Premium Watch image"  src={item.image} class="aspect-square w-full lg:max-w-[140px]"/>
                                </div>
                                <div class="flex flex-row items-center w-full ">
                                    <div class="grid grid-cols-1 lg:grid-cols-2 w-full">
                                        <div class="flex items-center">
                                            <div>
                                                <h2 class="font-semibold text-xl leading-8 text-black mb-3">
                                                   {item.title}
                                                </h2>
                                                <p class="font-normal text-lg leading-8 text-gray-500 mb-3">
                                                   {item.SSDCapacity}
                                                </p>
                                                <div class="flex items-center ">
                                                    <del class="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">{item.OldPrice} <span class="text-gray-500">OldPrice₹</span></del>
                                                    <p class="font-medium text-base leading-7 text-black ">Qty: <span class="text-gray-500">{item.quantity}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-5">
                                            <div class="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                                <div class="flex gap-3 lg:block">
                                                    <p class="font-medium text-sm leading-7 text-black">price</p>
                                                    <p class="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">₹{item.price}</p>
                                                </div>
                                            </div>
                                            <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                                <div class="flex gap-3 lg:block">
                                                    <p class="font-medium text-sm leading-7 text-black">Date</p>
                                                    <p class="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">{data}</p>
                                                </div>
                                            </div>
                                            <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                           
                                                <div class="flex gap-3 lg:block">
                                                    <p class="font-medium text-sm whitespace-nowrap leading-6 text-black"> Time</p>
                                                    <p class="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">{eyeTime}</p>
                                                </div>

                                           
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div class="w-full border-t border-gray-200 px-9 flex flex-col lg:flex-row items-center justify-between ">
                        <div class="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-180">
                            <button class="flex outline-0 py-6 sm:pr-6 sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
                            <img 
                            style={{ width: "20%", height: "20%", transition: "transform 0.2s" }}
                            src={cancle}></img>
                                Cancel Order
                            </button>
                            <p class="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">Paid using Credit Card <span class="text-gray-500">ending with 8822</span></p>
                        </div>
                        <p class="font-semibold text-lg text-black py-6">Total Price: <span class="text-indigo-600">₹{totalamount}</span></p>
                    </div>
                </div>
            </div>
        
        </section>
        </div>
    );
}

export default EyeOder;