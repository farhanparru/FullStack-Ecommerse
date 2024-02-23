import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../App';
import { toast } from 'react-toastify';

const  Success = () => {

 const navigate = useNavigate()

 useEffect(()=>{
  let isSuccess = true;

  const fethData = async ()=>{
    try{
      const response = await Axios.get(`http://localhost:3000/api/users/payment/success`)
      if(response.status === 201 && isSuccess)
         toast.success('Payment Successfully')
         navigate('/')
      
    }catch(error){
       navigate('/')
    }
  }

  const timeoutId = setTimeout(fethData,3001)
  return ()=>{
     isSuccess = false;
      clearTimeout(timeoutId)
  }

 },[])



  return (
    
<div className="payment-success d-flex justify-content-md-center">
         <img
            src="https://cdn.dribbble.com/users/253392/screenshots/6906291/check.gif"
            alt="Success"
         />
      </div>


  );
}

export default Success;
