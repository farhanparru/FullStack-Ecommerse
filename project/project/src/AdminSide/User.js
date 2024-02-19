import React, { useEffect, useState } from 'react'
import { Axios } from '../App'


const User = () => {
const [products,setProducts]=useState([])
useEffect(()=>{

    const fetchProducts = async()=>{
        const response=await Axios.get("api/admin/users")

        console.log(response,"oo");

        if(response.status ===200){
            setProducts(response.data.data)
        }
      }

      fetchProducts()
},[])




  return (
    <div className="overflow-x-auto">
    {products.map((item)=>(
        <table className="table">
        <thead>
          <tr key={item.useId}>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>username</th>
            <th>EMail</th>
            <th>ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{item.username}</div>
                  <div className="text-sm opacity-50"></div>
                </div>
              </div>
            </td>
            <td>
            {item.EMail}
              <br />
              <span className="badge badge-ghost badge-sm"></span>
            </td>
            <td>{item.ID}</td>
            <td>
              <button className="btn btn-ghost btn-xs">details</button>
            </td>
          </tr>
        </tbody>
      </table>

    ))}
      
    </div>
  );
};

export default User;
