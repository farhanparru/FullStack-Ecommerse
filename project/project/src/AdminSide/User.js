
import React, { useEffect, useState } from 'react'
import { Axios } from '../App';
import { toast } from 'react-toastify';
import avatar from '../assets/avtar admin.png'
import SideBar from './SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';



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
    <div style={{ margin: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "140%" }}>
        <thead>
          <tr>
            <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
              <input type="checkbox" style={{ transform: 'scale(1.5)' }} />
            </th>
            <th style={{ padding: '12px', borderBottom: '5px solid #ddd', fontWeight: 'bold' }}>Username</th>
            <th style={{ padding: '12px', borderBottom: '5px solid #ddd', fontWeight: 'bold' }}>Email</th>
            <th style={{ padding: '12px', borderBottom: '5px solid #ddd', fontWeight: 'bold' }}>ID</th>
          
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
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{item._id}</td>
           
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                 
                    
                <select id="countries" style={{ backgroundColor: '#f3f4f6', border: '1px solid #cbd5e0', color: '#4a5568', fontSize: '14px', borderRadius: '6px', outline: 'none', padding: '8px 12px', width: '100%', boxSizing: 'border-box' }}>
                <option selected style={{ color: '#6b7280' }}>Choose a user Action</option>
                <option value="US" style={{ color: 'red' }}>
                    <FontAwesomeIcon icon={faBan} /> Block
                </option>
                <option value="CA" style={{ color: '#047857' }}>
                    <FontAwesomeIcon icon={faCheckCircle} /> Unblock
                </option>
            </select>


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