import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [confirm, setConfirm] = useState("");

  const userValid = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/forgotpassword/${id}/${token}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.status === 201) {
        console.log("user Valid");
      } else {
        navigate("*");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setVal = (e) => {
    setPassword(e.target.value);
  };

  const setConfirmVal = (e) => {
    setConfirm(e.target.value);
  };

  const sendPassword = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/users/${id}/${token}`,
        {
          password: password,
          confirm: confirm,
          // Correct payload format
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.status === 201) {
        setPassword("");
        setConfirm("");
        setMessage(true); // Update message state when password is successfully updated
      } else {
        toast.error("! Token Expired generate new Link");
        navigate("*");
      }
    } catch (error) {
      toast.error("! Token Expired generate new Link");
      navigate("*");
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
        rel="stylesheet"
      />

      <style>
        {`
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }

          .text-lg {
            font-size: 1.125rem; /* Adjust font size for text-lg */
          }

          .text-xs {
            font-size: 0.75rem; /* Adjust font size for text-xs */
          }

          .font-semibold {
            font-weight: bold; /* Adjust font weight for font-semibold */
          }
        `}
      </style>

      <section className="w-full max-w-md">
        <main id="content1" role="main" className="mx-auto">
          <div className="bg-white border shadow-lg mt-7 rounded-xl p-4 sm:p-7">
            <div className="text-center mb-8">
              <div className="flex items-end justify-center text-2xl font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-indigo-600 fill-current"
                >
                  <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.4267 20 20 16.4267 20 12C20 7.57333 16.4267 4 12 4C7.57333 4 4 7.57333 4 12C4 16.4267 7.57333 20 12 20ZM12 18C8.68 18 6 15.32 6 12C6 8.68 8.68 6 12 6C15.32 6 18 8.68 18 12C18 15.32 15.32 18 12 18ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
                </svg>
              </div>
              <h1 className="block text-lg font-bold text-gray-800">
                Reset Password
              </h1>
            </div>

            <form className="mt-5" onSubmit={sendPassword}>
              {message ? (
                <p style={{ color: "green", fontWeight: "bold" }}>
                  Password Successfully updated
                </p>
              ) : (
                ""
              )}
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="new_password"
                    className="block mb-2 ml-1 text-xs font-semibold"
                  >
                    New password
                  </label>
                  <div className="relative">
                    <input
                      type={isPasswordHidden ? "password" : "text"}
                      id="new_password"
                      name="new_password"
                      onChange={setVal}
                      value={password}
                      className="block w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                      aria-describedby="new-password-error"
                      placeholder="Enter a new password"
                    />
                  </div>
                  <p
                    className="hidden mt-2 text-xs text-red-600"
                    id="new-password-error"
                  >
                    Please include a password that complies with the rules to
                    ensure security
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="confirm_new_password"
                    className="block mb-2 ml-1 text-xs font-semibold"
                  >
                    Confirm new password
                  </label>
                  <div className="relative">
                    <input
                      type={isPasswordHidden ? "password" : "text"}
                      onChange={setConfirmVal}
                      value={confirm}
                      id="confirm_new_password"
                      name="confirm_new_password"
                      className="block w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                      aria-describedby="confirm-new-password-error"
                      placeholder="Enter a new password"
                    />
                  </div>
                  <p
                    className="hidden mt-2 text-xs text-red-600"
                    id="confirm-new-password-error"
                  >
                    Please include a password that complies with the rules to
                    ensure security
                  </p>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="show-password"
                    onChange={() => setPasswordHidden(!isPasswordHidden)}
                  />
                  <label
                    htmlFor="show-password"
                    className="ml-2 text-xs font-semibold"
                  >
                    Show password
                  </label>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Reset my password
                </button>
              </div>
            </form>
          </div>
        </main>
      </section>
    </div>
  );
};

export default ForgetPassword;
