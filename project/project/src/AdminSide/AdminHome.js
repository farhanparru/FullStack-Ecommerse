import React, { useEffect, useState } from 'react';
import Main from './Main';
import { Axios } from '../App';
import { FaUser } from 'react-icons/fa';
import { MdList } from 'react-icons/md';

const AdminHome = () => {
 
  const [count,setCount]=useState(null)
  const [oderCount,setOderCount]=useState(null)



  
    
    useEffect(()=>{
      const CountUser = async()=>{
      try{
        const response = await Axios.get('api/admin/users')
        setCount(response.data.data.length)
      }catch(error){
        console.log(error);
      }
  }
  CountUser()
},[])



useEffect(()=>{
   const OrderCount = async()=>{
    try{
       const response = await Axios.get('api/admin/orders')
       
       setOderCount(response.data.products.length)
    }catch(error){
       console.log(error);
    }
   }
   OrderCount()
})
 
 
 


  
  return (
    <div>
      <div className='container-fluid bg-secondary'>
        <h1 style={{ textAlign: 'center', color: 'white', paddingTop: '20px' }}>Welcome to Admin Dashboard</h1>
        <div className="row">
          <div className="col-md-6" style={{marginLeft:"25%"}}>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
              <div className="card">
                <div className="card-content text-center">
                <FaUser size={48} style={{ margin: 'auto', display: 'block' }} /> {/* React Icons user icon */}
                  <h3>Clients</h3>
                  <h1>{count}</h1>
                  <span className="icon widget-icon text-green-500"><i className="mdi mdi-account-multiple mdi-48px"></i></span>
                </div>
              </div>
              <div className="card">
                <div className="card-content text-center">
                <MdList size={48} style={{ margin: 'auto', display: 'block' }} />
                  <h3>Sales</h3>
                  <h1>{oderCount}</h1>
                  <span className="icon widget-icon text-blue-500"><i className="mdi mdi-cart-outline mdi-48px"></i></span>
                </div>
              </div>
              <div className="card">
                <div className="card-content text-center">
                  <h3>Performance</h3>
                  <h1>256%</h1>
                  <span className="icon widget-icon text-red-500"><i className="mdi mdi-finance mdi-48px"></i></span>
                </div>
                
              </div>
            </div>

            <div className="card mb-6">
              <header className="card-header">
                <p className="card-header-title">
                  <span className="icon"><i className="mdi mdi-finance"></i></span>
                  Performance
                </p>  
                <a href="#" className="card-header-icon">
                  <span className="icon"><i className="mdi mdi-reload"></i></span>
                </a>
              </header>
              <div className="card-content">
                <div className="chart-area">
                
                  <canvas id="big-line-chart" width="2992" height="1000" className="block" style={{ height: '400px', width: '100%' }}></canvas>
                </div>
              </div>
            </div>

            <div className="notification blue">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                <div className="flex items-center">
                  <span className="icon"><i className="mdi mdi-buffer"></i></span>
                 
                </div>
              
              </div>
            </div>
          </div>
          <div className="col-md-6">
          
          </div>
        </div>
        <Main />
      </div>
    </div>
  );
}

export default AdminHome;
