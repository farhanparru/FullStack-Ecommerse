import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import profile from '../assets/profile usre.png';


const userEmail = localStorage.getItem('email');


const Profile = () => {

  const { user } = useSelector((state) => state.user || { user: null });

   // Handle initial undefined state


  const [showEditProfile,setShowEditProfile] = useState(false)
  const toggleEditProfile = () =>{
    setShowEditProfile(!showEditProfile)
  }
  

  return (
    <section style={{ backgroundColor: '#eee', textAlign: 'center', padding: '50px' }}>
      <div className="container">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">User</a></li>
                <li className="breadcrumb-item active" aria-current="page">User Profile</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img src={profile} alt="user" className="rounded-circle img-fluid mx-9" style={{ width: '150px' }} />
                <h5 className="my-3">Frahan</h5>
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-home fa-lg me-2" style={{ color: '#333333' }}></i>
                      <p className="mb-0">Home</p>
                    </div>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-shopping-cart fa-lg me-2" style={{ color: '#333333' }}></i>
                      <p className="mb-0">My Orders</p>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <div className="d-flex align-items-center">
                      <i className="far fa-envelope fa-lg fa-lg me-2" style={{ color: '#333333' }}></i>
                      <p className="mb-0">My Cart</p>
                    </div>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-phone-alt fa-lg" style={{ color: '#333333' }}></i>
                      <p className="mb-0">Edit profile</p>
                    </div>
                  </li>
                 
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label htmlFor="fullName">Full Name</label>
                  </div>
                  <div className="col-sm-9">
                    <input type="text" id="fullName" className="form-control" placeholder='Enter a full Name' name={user?.username ||"_"} />
                  </div>
                </div>

                <div className="row mb-3">
  <div className="col-sm-3">
    <label htmlFor="email">Email</label>
  </div>
  <div className="col-sm-9">
    <p className="text-left">{userEmail}</p> 
  </div>
</div>




                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label htmlFor="phone">Phone</label>
                  </div>
                  <div className="col-sm-9">
                    <input type="tel" id="phone" className="form-control" placeholder='Enter Mobile Number' name={user?.phone} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label htmlFor="address">Address</label>
                  </div>
                  <div className="col-sm-9">
                    <input type="text" id="address" className="form-control"placeholder='Enter Address'  />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label htmlFor="country">Country</label>
                  </div>
                  <div className="col-sm-9">
                    <select id="country" className="form-select"  >
                      <option value="">Select Country</option>
                      <option value="India">India</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label htmlFor="state">State</label>
                  </div>
                  <div className="col-sm-9">
                    <select id="state" className="form-select" >
                      <option value="">Select State</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Goa">Goa</option>
                      <option value="Assam">Assam</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label htmlFor="district">District</label>
                  </div>
                  <div className="col-sm-9">
                    <input type="text" id="district" className="form-control" placeholder='Enter District'  />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label htmlFor="city">City</label>
                  </div>
                  <div className="col-sm-9">
                    <input type="text" id="city" className="form-control" placeholder='Enter City'   />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-3">
                    <label htmlFor="pincode">Pincode</label>
                  </div>
                  <div className="col-sm-9">
                    <input type="text" id="pincode" className="form-control" placeholder='Enter Pincode'  />
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <button type="button" className="btn btn-primary" >Submit</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Additional cards */}
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    {/* Additional content */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    {/* Additional content */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
