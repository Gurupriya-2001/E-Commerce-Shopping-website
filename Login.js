import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

 

  

  const handleSubmit = async(e) => {
    e.preventDefault();
    

    

    if (isForgotPassword) {
      setMessage('Password reset link sent to your email.');
      // Add actual reset logic here
      return;
    }

   

    if (isLogin) {
      const response = await axios.post('http://localhost:8080/api/admin/auth/log',{username,password});
        if(response.status===200)
        {
        login({ username }); // Pass user data to login
        setMessage('Login successful!');
        navigate('/admin'); // Navigate to admin page
        
      } else {
        setMessage('Invalid credentials, please try again.');
      }
    } else {
      setMessage('Registration successful! You can now log in.');
      // Add actual registration logic here
    }
    

    

    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">
          {isForgotPassword ? 'Forgot Password' : isLogin ? 'Login' : 'Create Account'}
        </h1>
        <p className="login-subtitle">
          {isForgotPassword ? 'Enter your email to reset your password.' 
                            : isLogin ? 'Please enter your credentials to log in.' 
                                      : 'Please fill in the details to create an account.'}
        </p>
        <form onSubmit={handleSubmit} className="login-form">
          
            <div className="form-group">
              <label htmlFor="name">userName:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                
                placeholder="Enter your name"
                className="form-input"
              />
            </div>
          
          
          {!isForgotPassword && (
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="form-input"
              />
            </div>
          )}
          <button type="submit" className="login-button">
            {isForgotPassword ? 'Reset Password' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        {!isForgotPassword && (
          <div className="toggle-link">
            <span>{isLogin ? 'Don’t have an account?' : 'Already have an account?'}</span>
            <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
              {isLogin ? 'Register' : 'Login'}
            </button>
          </div>
        )}
        <div className="toggle-link">
          <span>{isForgotPassword ? 'Remembered your password?' : 'Forgot your password?'}</span>
          <button onClick={() => setIsForgotPassword(!isForgotPassword)} className="toggle-button">
            {isForgotPassword ? 'Login' : 'Reset Password'}
          </button>
        </div>
        {message && <div className="alert-message">{message}</div>}
      </div>
    </div>
  );
};

export default Login;
