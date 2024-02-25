import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Axios} from  '../App'
import { toast } from 'react-toastify'

const EditProduct = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  const [productData,setProductData]=useState({
    title:'',
    description:'',
    price:'',
    image:'',
    category:'',
    OldPrice:'',
    ProcessorName:'',
    SSDCapacity:'',
    ScreenSize:'',
    OperatingSystem:'',
    BatteryBackup:'',

  })

  // console.log(productData.image,"kkk");

  useEffect(()=>{

    //getting a data
    const fetchProductData = async ()=>{
       try{
        const response = await Axios.get(`http://localhost:3000/api/admin/products/${id}`)
        // console.log(response,"kkk");



        if(response.status === 200){
          const {
            _id,
            title,
            description,
            price,
            image,
            category,
            OldPrice,
            ProcessorName,
            SSDCapacity,
            ScreenSize,
            OperatingSystem,
            BatteryBackup
          } = response.data.data

         setProductData({id:_id,
          title,
          description,
          price,
          image,
          category,
          OldPrice,
          ProcessorName,
          ScreenSize,
          SSDCapacity,
          OperatingSystem,
          BatteryBackup
        })

       }
    }catch(error){
      console.error('Error fething product data',error);
    };
  }
    fetchProductData();
  },[id])

  //update data

  const handleChange =(e)=>{
    const {name,value}=e.target;

    setProductData((prevData)=>({
      ...prevData,
      [name]:value,

    }))
  };


  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const response = await Axios.put('http://localhost:3000/api/admin/products',productData)

      // console.log(response,"kkk");

      if(response.status === 201){
        toast.success('Product edited successfully')
        navigate('/ProductList')
      }
    }catch(error){
      console.log('Error editing product:',error);
      toast.error('Failed to edit product')
    }
  }


  const handleCancel = () => {
    setProductData(productData);
    navigate('/ProductList');
  };


    return (
        <div>
  <section className="bg-white dark:bg-gray-900">
    <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update product</h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>

        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
            <input type="text" name="title"  className=" form-control"value={productData.title} onChange={handleChange} />
          </div>
          
          <div className="w-full">
            <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">description</label>
            <input type="text" name="description" className=" form-control" value={productData.description} onChange={handleChange} />
          </div>


          <div className="w-full">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OldPrice</label>
            <input type="number" name="OldPrice"  className=" form-control" value={productData.OldPrice} onChange={handleChange} />
          </div>

          <div className="w-full">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input type="number" name="price"  className=" form-control" value={productData.price} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="processorName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Processor Name</label>
            <input type="text" name="processorName"  className=" form-control" value={productData.ProcessorName} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="ssdCapacity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SSD Capacity</label>
            <input type="text" name="SSDCapacity" className=" form-control"value={productData.SSDCapacity} onChange={handleChange} />
          </div>


          <div>
            <label htmlFor="operatingSystem" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Operating System</label>
            <input type="text" name="OperatingSystem"  className="form-control" value={productData.OperatingSystem} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="screenSize" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Screen Size</label>
            <input type="text" name="ScreenSize" className=" form-control" value={productData.ScreenSize} onChange={handleChange} />
          </div>


          <div>
            <label htmlFor="batteryBackup" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Battery Backup</label>
            <input type="text" name="BatteryBackup"  className=" form-control" value={productData.BatteryBackup} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <select name="category" className=" form-control" value={productData.category} onChange={handleChange}>
              <option selected>Electronics</option>
              <option value="SmartPhone">SmartPhone</option>
              <option value="laptop">laptop</option>
            </select>
          </div>

          <div>
          <label htmlFor="Image">Image</label>
          <input type="file" name="image" className="form-control" defaultValue={productData.image} onChange={handleChange} />
        </div>
        </div>
        <div className="flex items-center space-x-4 ">
          <button type="submit" className=" bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Update product
          </button>

          <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={handleCancel}>
            <svg className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
            cancel
          </button>
        </div>
      </form>
    </div>
  </section>
</div>

      );
    }
    
    export default EditProduct;