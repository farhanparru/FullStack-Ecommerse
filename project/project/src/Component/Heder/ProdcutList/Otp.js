import React, { useEffect, useState } from 'react'
import { Axios } from '../../../App'
import axios from 'axios';

const Otp = () => {
  const [otp, setOtp] = useState('');

  const handleVerifyi = async () => {
  
    try {
      const response = await axios.post('http://localhost:3000/api/users/verifyiOtp', { otp });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
   <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
  <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div class="flex flex-col items-center justify-center text-center space-y-2">
        <div class="font-semibold text-3xl">
          <p>OTP Verification</p>
        </div>
        <div class="flex flex-row text-sm font-medium text-gray-400">
          <span class="font-bold">We have sent a code to your email ba**@dipainhouse.com</span>
        </div>
      </div>

      <div>
        <form action="" method="post">
          <div class="flex flex-col space-y-16">
            <div class="flex justify-center">
              
              <input class="border h-16 w-16 text-center form-control rounded" type="text" id="otpInput" maxLength="6" />
              <input class="border h-16 w-16 text-center form-control rounded" type="text" id="otpInput" maxLength="6" />
              <input class="border h-16 w-16 text-center form-control rounded" type="text" id="otpInput" maxLength="6" />
              <input class="border h-16 w-16 text-center form-control rounded" type="text" id="otpInput" maxLength="6" />
              <input class="border h-16 w-16 text-center form-control rounded" type="text" id="otpInput" maxLength="6" />
              <input class="border h-16 w-16 text-center form-control rounded" type="text" id="otpInput" maxLength="6" />
            </div>

            <div class="flex flex-col space-y-5">
              <div>
                <button class="flex items-center justify-center w-full border rounded-x1 outline-none py-4 bg-blue-700 border-none text-white text-sm shadow-sm" onClick={handleVerifyi}>
                  Verify Account
                </button>
              </div>

              <div class="flex items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't receive code?</p>
                <a class="flex items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Otp
