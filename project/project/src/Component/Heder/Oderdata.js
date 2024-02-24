import React, { useEffect, useState } from 'react'
import { Axios } from '../../App'
import SideBar from '../../AdminSide/SideBar'

const Oderdata = () => {

const [data,setdata]=useState([])



useEffect(()=>{
    const fetchOrder = async ()=>{
        try{
            const response = await Axios.get('api/admin/orders')
            // console.log(response,"ll");

            if(response.status === 200){
                setdata(response.data.products)
            }
        }catch(error){
            console.log(error);
        }
    }
    fetchOrder()
},[])




return (
    <div style={{ display: 'flex' }}>
      <SideBar/>
      {data.map((products)=>(
        <div className="table-responsive" style={{ margin: 'auto' }}>
          <table className="table table-striped" style={{marginBottom:"120%"}}>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>PaymentId</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                <td>{products._id}</td>
                <td>{products.date}</td>
                <td>{products.time}</td>
                <td>{products.payment_id}</td>
                <td>{products.total_amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
      }
  export default Oderdata;
  