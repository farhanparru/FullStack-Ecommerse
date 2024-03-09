import React, { useEffect, useState } from 'react';
import { Axios } from '../App';
import { toast } from 'react-toastify';
import avatar from '../assets/avtar admin.png';
import SideBar from './SideBar';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get('api/admin/users');
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      const response = await Axios.post('api/admin/user/block', { userId });
      const updatedUsers = users.map(user => {
        if (user._id === userId) {
          user.isActive = !user.isActive;
        }
        return user;
      });
      setUsers(updatedUsers);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to update user status");
    }
  };

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
              <th style={{ padding: '12px', borderBottom: '5px solid #ddd', fontWeight: 'bold' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item._id}>
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
                  <button
                    className={`btn btn-sm ${item.isActive ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => handleBlockUser(item._id)}
                  >
                    {item.isActive ? 'Block' : 'Unblock'}
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

export default User;
