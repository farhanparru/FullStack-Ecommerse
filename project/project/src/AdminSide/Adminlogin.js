import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Adminlogin = () => {


  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');



 const Navigate = useNavigate()
  
      



  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      toast.error('Enter all the inputs');
      return;
    }else{
       Navigate('/AdminHome')
       toast.success("Admin Login completed")
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
              <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={validateEmail}
                      className={`peer placeholder-transparent h-10 w-full sm:w-96 border-b-2 border-gray-300 text-gray-900 focus:outline-none ${
                        emailError ? 'border-red-500' : 'focus:border-rose-600'
                      }`}
                      placeholder="Email address"
                    />
                    {emailError && <p className="text-red-500">{emailError}</p>}
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      onBlur={validatePassword}
                      className={`peer placeholder-transparent h-10 w-full sm:w-96 border-b-2 border-gray-300 text-gray-900 focus:outline-none ${
                        passwordError ? 'border-red-500' : 'focus:border-rose-600'
                      }`}
                      placeholder="Password"
                    />
                    {passwordError && <p className="text-red-500">{passwordError}</p>}
                  </div>
                  <div className="relative">
                    <button type="submit" className="bg-cyan-500 text-white rounded-md px-2 py-1">
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
