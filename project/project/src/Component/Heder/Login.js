import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import { useNavigate ,Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginA from '../../assets/login animation.gif';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
;
      if (response.status === 200) {
        if (response.data.isBlocked) {
          toast.error('Your account has been blocked. Please contact the administrator.');
          return;
        }

        // Proceed with successful login
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('jwt', response.data.data);
        localStorage.setItem('email', response.data.Email);

        // Redirect user based on role
        const isAdmin = response.data.isAdmin; // Assuming the backend returns isAdmin flag
        if (isAdmin) {
          Navigate('/AdminHome');
        } else {
          Navigate('/');
        }

        toast.success('Login Successful');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Your account has been blocked. Please contact the administrator.');
    }
  };

  const handleNavigation = (path) => {
    Navigate(path);
  };

  return (
    <MDBContainer className="my-5">
      {error && (
        <div role="alert" className="alert alert-danger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      <MDBRow className="justify-content-center">
        <MDBCol md="4">
          <MDBCard>
            <img src={loginA} alt="lapd" />
            <MDBCardBody>
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="text-center text-md-start mt-4 pt-2">
                <Button className="bg-cyan-500 shadow-lg shadow-cyan-500/500 w-32 " onClick={handleLogin}>
                  Login
                </Button>

                <Link to="/password-reset"><p className="small fw-bold mt-2 pt-1 mb-2">
                  <span  className="link-danger">
                    Forgot Password
                  </span>
                </p></Link>


                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Don't have an account?{' '}
                  <a href="#!" className="link-danger" onClick={() => handleNavigation('/signup')}>
                    Register
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
