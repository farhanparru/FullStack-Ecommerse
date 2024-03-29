import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Resetpassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/sendpasswordlink",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setEmail("");
        setMessage(true);
      } else {
        toast.error("Invalid User");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-mono bg-gray-400 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-6">
        <div className="flex justify-center">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                <p className="mb-4 text-sm lg:text-base text-gray-700">
                  We get it, stuff happens. Just enter your email address below
                  and we'll send you a link to reset your password!
                </p>
              </div>
              {message ? (
                <p style={{ color: "green", fontWeight: "bold" }}>
                  Password reset link sent Successfully in Your Email
                </p>
              ) : (
                ""
              )}
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    style={{
                      width: "100%",
                      height: "40px",
                      fontSize: "16px",
                      letterSpacing: "1px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={setVal}
                    placeholder="Enter Email Address..."
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={sendLink}
                  >
                    Reset Password
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="#"
                  >
                    Create an Account!
                  </a>
                </div>
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="#"
                  >
                    Already have an account? Login!
                  </a>
                </div>
              </form>
            </div>
            <div
              className="w-full lg:w-1/2"
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg')",
                height: "700px",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
