import { useRef, useState } from "react";
import "../ProdcutList/OtpInput.css"; 
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; 

const OtpInput = () => {

  const [otp,setOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const location = useLocation();
  
  const Navigate = useNavigate();

  const LoginUser = async (e) => {
     e.preventDefault();
     if(otp === ""){
      toast.error("Enter Your OTP");
     } else if(!/[^a-zA-Z]/.test(otp)){
       toast.error("Enter Valid OTP");
     } else if(otp.length < 4){
       toast.error("OTP length minimum 4 digits");
     } else {
      try {
        const response = await axios.post("http://localhost:3000/api/users/userVerify", {
          email: location.state,
          otp: otp
        });
       
        const token = response.data.data;
        const userId = response.data.userId;
        const userEmail = response.data.Email;
       
        localStorage.setItem("jwt", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("email", userEmail);
       
        Navigate("/"); 
      } catch (error) {
     
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred while processing your request.");
        }
      }
     }
  }

  const fieldsRef = useRef();
  const [state, setState] = useState({
    code1: "",
    code2: "",
    code3: "",
    code4: "",
  });

  const inputFocus = (e) => {
    const elements = fieldsRef.current.children;
    const dataIndex = +e.target.getAttribute("data-index");
    if (e.key === "Delete" || e.key === "Backspace") {
      const next = dataIndex - 1;
      if (next > -1) {
        elements[next].focus();
      }
    } else {
      const next = dataIndex + 1;
      if (
        next < elements.length &&
        e.target.value !== " " &&
        e.target.value !== "" &&
        e.key.length === 1
      ) {
        elements[next].focus();
      }
    }
  };

  const handleChange = (e, codeNumber) => {
    const value = e.target.value;
    setState({ ...state, [codeNumber]: value });
    
    const newOtp = { ...state, [codeNumber]: value };
    const otpValue = Object.values(newOtp).join('').slice(0, 4); 
    setOtp(otpValue);
  };
  
  const email = `${location.state}`;
  const atIndex = email.indexOf("@");
  const hiddenEmail = email.substring(0, atIndex - 10) + "*".repeat(10) + email.substring(atIndex);


  return (
    <div className="container">
   
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-md-6">
       
          <div className="card otp-card">
          { !emailSent && 
            <span>Email has been sent for OTP: {hiddenEmail}</span>


            }
            <div className="card-body otp-content">
              <h5 className="card-title otp-label">Verification code</h5>
              <div ref={fieldsRef} className="otp-inputs">
                {[1, 2, 3, 4].map((index) => (
                  <input
                    key={index}
                    type="text"
                    data-index={index - 1}
                    placeholder="0"
                    value={state[`code${index}`]}
                    maxLength={1}
                    className="form-control otp-field"
                    onChange={(e) => handleChange(e, `code${index}`)}
                    onKeyUp={inputFocus}
                  />
                ))}
              </div>
              <button className="btn btn-primary btn-block mt-3" onClick={LoginUser}>Verify</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
