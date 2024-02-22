
import React, { useEffect, useState } from 'react'
import { Axios } from '../App';
import { toast } from 'react-toastify';
import avatar from '../assets/avtar admin.png'
import SideBar from './SideBar';





const User = () => {
const [users,setUsers]=useState([])

useEffect(()=>{

 const fetchUsers = async ()=>{
  try{
    const response= await Axios.get('api/admin/users')
  //  console.log(response,"kkk");
    setUsers(response.data.data)
  }catch(error){
    console.log(error);
    toast.error(error.message || "Failde to fetch users")
  }
 };
  fetchUsers()
  
},[])



return (
  <div style={{ display: 'flex' }}>
    <SideBar />
    <div className="overflow-x-auto " >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
              <input type="checkbox" style={{ transform: 'scale(1.5)' }} />
            </th>
            <th style={{ padding: '12px', borderBottom: '5px solid #ddd', fontWeight: 'bold' }}>Username</th>
            <th style={{ padding: '12px', borderBottom: '5px solid #ddd', fontWeight: 'bold' }}>Email</th>
            <th style={{ padding: '12px', borderBottom: '5px solid #ddd', fontWeight: 'bold' }}>ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item.userId}>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                <input type="checkbox" style={{ transform: 'scale(1.5)' }} />
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', overflow: 'hidden', borderRadius: '50%', border: '2px solid #ddd' }}>
                    <img src={avatar} alt="User Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ marginLeft: '10px' }}>{item.username}</div>
                </div>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd', fontStyle: 'italic' }}>{item.email}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{item.id}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '8px 16px', fontSize: '14px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default User;