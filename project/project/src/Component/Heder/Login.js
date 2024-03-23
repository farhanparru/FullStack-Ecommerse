import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaGoogle ,FaGithub } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  //Login with Google  Function
  const loginWithGoogle = () => {
    window.open("http://localhost:3000/auth/google", "_blank"); // Open Google authentication page in a new tab/window
};


  const handleLogin = async (e) => {
    e.preventDefault();

    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;

    if (email === "" || password === "") {
      toast.error("Enter all the inputs");
      return;
    }

    let url = "http://localhost:3000/api/users/login";

    if (email === adminEmail) {
      url = "http://localhost:3000/api/admin/login";
    }

    try {
      const payload = { email, password };
      const response = await axios.post(url, payload);

      if (response.status === 200) {
        if (email !== adminEmail) {
        } else {
          localStorage.setItem("role", "admin");
        }
        localStorage.setItem("jwt", response.data.data);

        
        if (email !== adminEmail) {
          Navigate("/Otp", { state: email });
        } else {
          Navigate("/AdminHome");
        }
        toast.success("Login Successful");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("User account has been blocked. Please contact the administrator.");
    }
  };

 

    return (
      <div>
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
              <div className="col-md-8 col-lg-7 col-xl-6">
                <img
                  src="https://img.freepik.com/free-vector/gradient-ssl-illustration_23-2149247155.jpg"
                  className="img-fluid"
                  alt="Phone image"
                />
              </div>
              <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <form>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form1Example13"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      className="form-label"
                      htmlFor="form1Example13"
                    >
                      Email address
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form1Example23"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      className="form-label"
                      htmlFor="form1Example23"
                    >
                      Password
                    </label>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="form1Example3"
                        checked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form1Example3"
                      >
                        {" "}
                        Remember me{" "}
                      </label>
                    </div>
                    <div>
                      <p className="small fw-bold mb-2">
                        <Link to="/signup" className="link-danger">
                          Don't have an account? Register
                        </Link>
                      </p>
                      <p className="small fw-bold mb-0">
                        <Link to="/password-reset" className="link-danger">
                          Forgot password?
                        </Link>
                      </p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={handleLogin}
                  >
                    Sign in
                  </button>
                  <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0 text-muted">
                      OR
                    </p>
                  </div>
  
                  <button
                    className="login-with-google-btn btn btn-light btn-lg btn-block"
                    onClick={loginWithGoogle}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#78dcca",
                      color: "#757575",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "10px 20px",
                      fontSize: "16px",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      marginBottom: "10px",
                    }}
                  >
                    <span style={{ marginRight: "10px" }}>
                      <FaGoogle />
                    </span>{" "}
                    Sign In With Google
                  </button>

                  <button
                  className="login-with-github-btn btn btn-light btn-lg btn-block"
                  style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#565584",
                      color: "#757575",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "10px 20px",
                      fontSize: "16px",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      marginBottom: "10px",
                    }}
              
                >
                  <span style={{ marginRight: "10px" }}>
                    <FaGithub />
                    
                  </span>{" "}
                  Sign In With GitHub
                </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default Login;