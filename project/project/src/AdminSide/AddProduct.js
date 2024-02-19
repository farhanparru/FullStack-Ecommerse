import React from 'react';
import SideBar from './SideBar';

const AddProduct = () => {
  return (

  
     
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
    
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Product</h3>
      <form>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Product Name</label>
          <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter product name" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <div style={{ flex: '0 0 48%' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Price</label>
            <input type="number" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter price" />
          </div>
          <div style={{ flex: '0 0 48%' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Old Price</label>
            <input type="number" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter old price" />
          </div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Quantity</label>
          <input type="number" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter quantity" />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Category</label>
          <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter category" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <div style={{ flex: '0 0 48%' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Processor Name</label>
            <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter processor name" />
          </div>
          <div style={{ flex: '0 0 48%' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>SSD Capacity</label>
            <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter SSD capacity" />
          </div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Operating System</label>
          <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter operating system" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <div style={{ flex: '0 0 48%' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Screen Size</label>
            <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter screen size" />
          </div>
          <div style={{ flex: '0 0 48%' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Battery Backup</label>
            <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter battery backup" />
          </div>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Image Upload</label>
          <input type="file" style={{ width: '100%' }} />
        </div>
        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
