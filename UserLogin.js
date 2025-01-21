import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App1.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Define your validation schema using yup
const userSchema = yup.object().shape({
  username: yup.string().required('Enter a valid username'),
  password: yup.string()
  .min(6, 'Password must be at least 6 characters')
  .max(12, 'Password must be at most 12 characters')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
  .required('Enter a valid Password'),
});

function UserLogin() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form data
      await userSchema.validate({ username, password }, { abortEarly: false });
      setErrors({}); // Clear previous errors

      // If validation passes, proceed with login
      try {
        const response = await axios.post('http://localhost:8080/api/user/auth/logadmin', {
          username,
          password
        });
        if (response.status === 200) {
          alert('Login successful');
          navigate('/products'); // Navigate to another page upon successful login
        } else {
          setErrors({e:'Invalid credentials' });
        }
      } catch (error) {
        setErrors({e:'Error logging in. Invalid username or password' });
      }

    } catch (err) {
      // Handle validation errors
      const errMessages = {};
      err.inner.forEach((e) => {
        errMessages[e.path] = e.message;
      });
      setErrors(errMessages);
    }
  };

  return (
    <div className="container col-12 mt-5 d-sm-block " id="div1">
      <div className="row justify-content-center" id="div2">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">User Name:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter UserName"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <div className="text-danger">{errors.username}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                id="password"
                className="form-control"
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-danger">{errors.password}</div>
            </div>

            {errors.e && <div className="text-danger">{errors.e}</div>}

            <div className='divbtn'>
              <button
                type="submit"
                className="btn btn-primary"
                id='btn'
              >
                Login
              </button>
            </div>

            <div className="link">
              Dont have an Account<Link to="/reg"> ? Create Account</Link></div>
              <br></br>
               <div className="/Home" ><Link to="/Home">Login as Guest</Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
