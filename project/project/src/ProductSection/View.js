import React, {  useEffect, useState } from 'react'
// /import { Axios } from '../App'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Axios } from '../App';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />


const View = () => {
const isUser = localStorage.getItem("username")

const navigate = useNavigate()
const [product, setProduct]=useState([])
const userId =localStorage.getItem("userId")
const { id } = useParams()

// console.log(userId,"hjai");

useEffect(()=>{
  const fechProduct = async ()=>{
    try{
      const response = await axios.get(`http://localhost:3000/api/users/products/${id}`)
  //  console.log(response.data.data,"kk");
     
      if(response.status === 200){
        // toast.success("product fetched successfuly",{
        //    toastId:"success1"
        // })
        setProduct(response.data.data)
      }
 
    }catch(error){
      console.log(error);
    }
  }
fechProduct()
},[])






const handleAddToCart = async(event)=>{
  event.preventDefault()
  
   try{
     const response = await Axios.post(`http://localhost:3000/api/users/${userId}/cart`,{productId:id});
     console.log(response,"hhh");

    //  console.log(response,"oooooo");

     if(response && response.data && response.data.status === "success"){
           toast.success('Product successfully added to the  cart ')
     }else{
        console.log('Unexpected response structure:',response);
        toast.error('Unexpected response structure')
     }
   }catch(error){
     console.log('Error adding product to the cart:',error);
     toast.error(error.response ? error.response.data.message:'An error occured')
   }
}


  return (
    <div>
    <img 
  src='https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg' 
  style={{
    
    left: 10,
    width: "70cm"
  }}
/>
      <div class="relative z-10" role="dialog" aria-modal="true">
 
  <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
    
      <div class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
        <div class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
          <button type="button" class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8">
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" onClick={() => navigate('/laptop')}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
            <div class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                 
              <img   variant='top' src={product.image} alt="Two each of gray, white, and black shirts arranged on table." class="object-cover object-center"/>
                
            </div>
            <div class="sm:col-span-8 lg:col-span-7">
              <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">${product.Price}</h2>

              <section aria-labelledby="information-heading" class="mt-2">
                <h3 id="information-heading" class="sr-only">Product information</h3>

                <p class="text-2xl text-gray-900">OldPrice:${product.OldPrice}</p>

              
                <div class="mt-6">
                  <h4 class="sr-only">Reviews</h4>
                  <div class="flex items-center">
                    <div class="flex items-center">
                     
                      <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                      </svg>
                      <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                      </svg>
                      <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                      </svg>
                      <svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                      </svg>
                      <svg class="text-gray-200 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <p class="sr-only">3.9 out of 5 stars</p>
                    <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
                  </div>
                </div>
              </section>

              <section aria-labelledby="options-heading" class="mt-10">
                <h3 id="options-heading" class="sr-only">Product options</h3>

                <form>
                  
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">Color</h4>

                    <fieldset class="mt-4">
                      <legend class="sr-only">Choose a color</legend>
                      <span class="flex items-center space-x-3">
                       
                        <label class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                          <input type="radio" name="color-choice" value="White" class="sr-only" aria-labelledby="color-choice-0-label"/>
                          <span id="color-choice-0-label" class="sr-only">White</span>
                          <span aria-hidden="true" class="h-8 w-8 bg-white rounded-full border border-black border-opacity-10"></span>
                        </label>
                        
                        <label class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                          <input type="radio" name="color-choice" value="Gray" class="sr-only" aria-labelledby="color-choice-1-label"/>
                          <span id="color-choice-1-label" class="sr-only">Gray</span>
                          <span aria-hidden="true" class="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"></span>
                        </label>
                        
                        <label class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900">
                          <input type="radio" name="color-choice" value="Black" class="sr-only" aria-labelledby="color-choice-2-label"/>
                          <span id="color-choice-2-label" class="sr-only">Black</span>
                          <span aria-hidden="true" class="h-8 w-8 bg-gray-900 rounded-full border border-black border-opacity-10"></span>
                        </label>
                      </span>
                    </fieldset>
                  </div>

                  <div class="mt-10">
                    <div class="flex items-center justify-between">
                      <h4 class="text-sm font-medium text-gray-900">Product Detials</h4>
                     
                    </div>

                    <fieldset class="mt-4">
  <legend class="sr-only">Product Details</legend>
  <div>
    <h4 class="text-sm font-medium text-gray-900">Model Name</h4>
    <p>{product.ProductName}</p>
  </div>
  <div class="mt-1">
    <h4 class="text-sm font-medium text-gray-900">Processor</h4>
    <p>{product.ProcessorName}</p>
  </div>
  <div class="mt-1">
    <h4 class="text-sm font-medium text-gray-900">RAM</h4>
    <p>{product.RAM} GB</p>
  </div>
  <div class="mt-1">
    <h4 class="text-sm font-medium text-gray-900">Storage</h4>
    <p>{product.SSDCapacity} SSD</p>
  </div>
  <div class="mt-1px">
    <h4 class="text-sm font-medium text-gray-900">Operating System</h4>
    <p>{product.OperatingSystem}</p>
  </div>
  <div class="mt-1px">
    <h4 class="text-sm font-medium text-gray-900">Screen Size</h4>
    <p>{product.ScreenSize}</p>
  </div>
  <div class="mt-1px">
    <h4 class="text-sm font-medium text-gray-900">Battery Backup</h4>
    <p>Up to {product.BatteryBackup} Hours</p>
  </div>
</fieldset>

                  </div>

                  <button type="submit" class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleAddToCart} >
                  <i class="fas fa-shopping-cart mr-2"></i>
                  Add to Cart</button>

                  <button type="submit" class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                   onClick={()=> 
                   navigate(`/Cart/${userId}`)}>

                  <i class="fas fa-shopping-cart mr-2"></i>
                  Go to Cart</button>
                 
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
    </div>
  )
}

export default View
