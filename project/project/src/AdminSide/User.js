import React, { useEffect, useState } from 'react'
import { Axios } from '../App'




const User = () => {
const [users,setUsers]=useState([])

useEffect(()=>{

  async function fetchUsers(){
     try{
       const jwtToken ={
         headers:{
          Authorization:`${localStorage.getItem("jwt")}`
         }
       }
       console.log(jwtToken,"iiii");
       const response = await Axios.get(
        "http://localhost:3000/api/admin/users",jwtToken
        )
        console.log(response,"kkkk");

        if(response.status === 200){
           setUsers(response.data.data)
        }
     }catch (error){
       console.log('Error fetching users:',error);
     }
  }
  fetchUsers()
},[])




  return (
    <div className="overflow-x-auto">
    {users.map((item)=>(
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
