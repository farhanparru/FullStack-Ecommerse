import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios, { Axios } from 'axios';

const Adminlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };



  const handleSubmit = async(e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      toast.error('Enter all the inputs');
      return;
    }

    // Basic validation: check if email and password match predefined values
    const ADMIN_EMAIL = "admin@123";
    const ADMIN_PASSWORD = "admin";

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      toast.error('Invalid email or password');
      return;
    }

   try{
    const data = {
       email:email,
       password:password,
    };
    
    

    const response = await axios.post(
      "http://localhost:3000/api/admin/login",
      data
    );
    // console.log(response,"kkk");
    
 

    localStorage.setItem("admin_Token",response.data.data)
    


    toast.success("Admin Login completed");
    navigate('/AdminHome');
   
   }catch(error){
     toast.error("invalid")
   }


   
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>
              <form  className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      onChange={handleEmailChange}
                      className="peer placeholder-transparent h-10 w-full sm:w-96 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="peer placeholder-transparent h-10 w-full sm:w-96 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                      placeholder="Password"
                    />
                  </div>
                  <div className="relative">
                    <button type="submit" className="bg-cyan-500 text-white rounded-md px-2 py-1" onClick={handleSubmit}>
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="w-full flex justify-center">
              <span>Continue with Google</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;
