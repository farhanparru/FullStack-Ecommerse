import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Axios } from '../App';

const Order = () => {
 const [orderes,setOrder]=useState([])
 const navigate = useNavigate()
 const {id} = useParams()

 useEffect(()=>{
    const fetchOrder = async ()=>{
    try{

        const response = await Axios.get(`http://localhost:3000/api/users/${id}/orders`)
        if(response.status === 200){
            setOrder(response.data.data)
        }

        console.log(response)
      
    }catch(error){
        console.log(error);
    }

    }
  fetchOrder()
        
 },[id])




  return (
    <div>
   
                                            
    </div>
  );
}

export default Order;
