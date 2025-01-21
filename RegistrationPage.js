import React, { useState } from 'react';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App1.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function RegistrationPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); // Initialize useNavigate

  const userSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string(),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(12, 'Password must be at most 12 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
      .required('Password must have one uppercase, one lowercase, one special character and numbers'),
    age: yup.number().typeError('Age must be a number').integer('Age must be an integer').min(18, 'Age must be at least 18').max(80, 'Age must be at most 80').required('Age is required'),
    mobile: yup.string().matches(/^\d{10}$/, 'Mobile must be a 10-digit number').required('Mobile is required'),
  });

  async function validateForm() {
    try {
      await userSchema.validate({
        firstName,
        lastName,
        email,
        password,
        age,
        mobile,
      }, { abortEarly: false }); // abortEarly: false, is used to display all error messages

      setErrors({}); // Clear any previous errors
      alert('Registered successfully');

      // Reset form fields
      setFirstName('');
      setLastName('');
      setMobile('');
      setAge('');
      setEmail('');
      setPassword('');

      // Navigate to products page
      navigate('/Home');

    } catch (error) {
      const errorMessages = {};
      error.inner.forEach((e) => {
        errorMessages[e.path] = e.message;
      });
      setErrors(errorMessages);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name:</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div className="text-danger">{errors.firstName}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name:</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <div className="text-danger">{errors.lastName}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile:</label>
              <input
                type="text"
                className="form-control"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <div className="text-danger">{errors.mobile}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="age" className="form-label">Age:</label>
              <input
                type="text"
                className="form-control"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <div className="text-danger">{errors.age}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-danger">{errors.email}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                placeholder='Must contain one Upper,Lower,Special Char and numbers'
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-danger">{errors.password}</div>
            </div>

            <div className="divbtn">
              <button
                type="button"
                className="btn btn-primary"
                onClick={validateForm}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
