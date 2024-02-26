import React from 'react';
import Main from './Main';


const AdminHome = () => {
  // Example data, replace it with actual data
  
  return (
    <div>
      <div className='container-fluid bg-secondary'>
        <h1 style={{ textAlign: 'center', color: 'white', paddingTop: '20px' }}>Welcome to Admin Dashboard</h1>
        <div className="row">
          <div className="col-md-6">
         
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
