import React, { useEffect, useState } from 'react';
import { Axios } from '../../App';
import SideBar from '../../AdminSide/SideBar';
import { FaEye } from 'react-icons/fa'; // Importing Eye icon from react-icons library
import { FaCalendarAlt, FaClock, FaMoneyBillAlt } from 'react-icons/fa'; 
import { FaCreditCard } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const OrderData = () => {
  const [data, setData] = useState([]);
   const navigate = useNavigate()

   const{id}=useParams()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await Axios.get('api/admin/orders');

        if (response.status === 200) {
          setData(response.data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, []);




  

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <SideBar />
      <div style={{ margin: 'auto' }}>
        <h2>Order Summary</h2>
        <table style={{ borderCollapse: 'collapse', width: '100%' ,marginBottom:"129vh"}}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
           
              <th style={{ padding: '8px', textAlign: 'left', width: '20%' }}><FaClock/> Date</th>
              <th style={{ padding: '8px', textAlign: 'left', width: '20%' }}><FaCreditCard/> Payment ID</th>
              <th style={{ padding: '8px', textAlign: 'left', width: '20%' }}><FaMoneyBillAlt/> Total</th>
              <th style={{ padding: '8px', textAlign: 'left', width: '10%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product._id} style={{ borderBottom: '1px solid #ddd' }}>
             
                <td style={{ padding: '8px' }}>{product.date}</td>
                <td style={{ padding: '8px' }}>{product.payment_id}</td>
                <td style={{ padding: '8px' }}>{product.total_amount}</td>
                <td style={{ padding: '8px' }}>
                  <button className="view-icon" style={{ border: 'none', background: 'none' }}>
                    <FaEye  onClick={() => navigate(`/EyeOder/${product._id}`)}className="icon" style={{ transition: 'transform 0.3s ease-in' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderData;