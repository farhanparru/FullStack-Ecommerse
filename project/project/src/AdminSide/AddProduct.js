import React, { useState } from 'react';
import SideBar from './SideBar';
import {toast} from 'react-toastify'
import axios from  'axios'
  

 


 
   
const AddProduct = () => {

 const [title,setTitle]=useState('')
 const [description,setDescription]=useState('')
 const [price,setPrice]=useState('')
 const [category,setCategory]=useState('')
 const [OldPrice,setOldPrice]=useState('')
 const [processorName,setProcessorName]=useState('')
 const [SSDCapacity,setSSDCapacity] = useState('')
 const [OperatingSystem,setOperatingSystem]=useState('')
 const [ScreenSize,setScreenSize]=useState('')
 const [BatteryBackup,setBatteryBackup]=useState('')
 const [image,setImage]= useState(null)

 const handleImageChange = (img) => {
  const selectedImage = img.target.files[0];
  setImage(selectedImage);
};

 const handleSubmit = async (e)=>{
   e.preventDefault()

  if(!title|| !category || !price |!description || !OldPrice || !SSDCapacity  || !OperatingSystem || !ScreenSize || !BatteryBackup || !image){
    toast.error("Please fill in all fields")
    return;
  }

    const fromData = new FormData();
    fromData.append('title',title)
    fromData.append('description',description)
    fromData.append('price',price)
    fromData.append('category',category)
    fromData.append('OldPrice',OldPrice)
    fromData.append('processorName',processorName)
    fromData.append('SSDCapacity',SSDCapacity)
    fromData.append('OperatingSystem',OperatingSystem)
    fromData.append('ScreenSize',ScreenSize)
    fromData.append('BatteryBackup',BatteryBackup)
    fromData.append('image',image)

    try{
      const jwtToken = {
        headers:{
          'Content-Type':'multipart/form-data',
          Authorization:localStorage.getItem('admin_Token')
        }
      }
      
      // console.log(jwtToken,"ll");
      const response = await  axios.post('http://localhost:3000/api/admin/products',
      fromData,jwtToken

      )
    //  console.log(response,"jj");

   if(response.status === 201){
      toast.success('Product added successFully')
   }else{
     toast.error('Failed to add product')
   }

    }catch(error){
      console.log('Error uploading product',error);
    }

 }



  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Product</h3>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Product Name</label>
            <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter product name"
            name="title"
            className='from-control'
            onChange={(e)=> setTitle(e.target.value)} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div style={{ flex: '0 0 48%' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Price</label>
              <input type="number" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter price"
              name='price'
              className='from-control'
              onChange={(e)=>setPrice(e.target.value)}
               />
            </div>

            <div style={{ flex: '0 0 48%' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>OldPrice</label>
              <input type="number" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter old price"
              name="OldPrice"
              className='from-control'
              onChange={(e)=>setOldPrice(e.target.value)}
               />
            </div>

          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Category</label>
            <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter category"
            name='category'
            className='from-control'
            onChange={(e)=>setCategory(e.target.value)}
             />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>description</label>
            <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter description" 
            name='description'
            className='from-control'
            onChange={(e)=>setDescription(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div style={{ flex: '0 0 48%' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Processor Name</label>
              <input type="text" 
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
              placeholder="Enter processor name" 
              name="processorName"
              className='from-control'
              onChange={(e)=>setProcessorName(e.target.value)}
              />
              
            </div>

            <div style={{ flex: '0 0 48%' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>SSD Capacity</label>
              <input type="text" 
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
               placeholder="Enter SSD capacity"
               name="SSDCapacity"
               className='from-control'
               onChange={(e)=>setSSDCapacity(e.target.value)}
                />
            </div>

          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Operating System</label>
            <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter operating system" 
              name='OperatingSystem'
              className='from-control'
              onChange={(e)=>setOperatingSystem(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div style={{ flex: '0 0 48%' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Screen Size</label>
              <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter screen size"
              name='ScreenSize'
              className='from-control'
              onChange={(e)=>setScreenSize(e.target.value)}
               />
            </div>


            <div style={{ flex: '0 0 48%' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Battery Backup</label>
              <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter battery backup" 
                name='BatteryBackup'
                className='from-control'
                onChange={(e)=>setBatteryBackup(e.target.value)}
              />
            </div>


          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Image Upload</label>
            <input type="file" 
              name='image'
              className='from-control'
              onChange={handleImageChange}
            style={{ width: '100%' }} />
          </div>


          <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;