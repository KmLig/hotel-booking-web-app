import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/auth';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialUser = {
    email: "",
    password: "",
    userName: "",
    fullName: "",
    phoneNumber: 0

  };
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(initialUser);

  const handleChange = (e) => {
    setUser(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleReset = (e) => {
    setUser(initialUser);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: 'PUT',
        url: 'http://localhost:5000/api/auth/signup',
        data: user
      });
      dispatch(signup(response.data));
      navigate("/login");
    } catch (error) {
      if (error) {
        setErrorMessage(error.message);
      }
    }
  };




  return (
    <>
      <Navbar />
      <Header type='list' />
      <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className='container'>
          <div className=" row justify-content-center">
            <div className='col-6 '>
              {errorMessage ? (<h5 className='d-flex mb-3 justify-content-center btn btn-danger'>{errorMessage}</h5>) : ""}
              <div className=" card mx-4 ">
                <div className=" card-body p-4 ">
                  <form method='POST' onSubmit={handleSubmit}>
                    <h1 className='text-center'>Register</h1>
                    <p className="text-medium-emphasis text-center">Create your account</p>

                    <div className="mb-3 mt-3">
                      <label htmlFor="email" className="form-label">Email:</label>
                      <input type="email" className="form-control" value={user.email} id="email" placeholder="Enter email" name="email" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password:</label>
                      <input type="password" className="form-control" value={user.password} id="password" placeholder="Enter password" name="password" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="userName" className="form-label">Your name:</label>
                      <input type="password" className="form-control" id="userName" placeholder="Enter your name" name="userName" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">Full name:</label>
                      <input type="fullName" className="form-control" id="fullName" placeholder="Enter your full name" name="fullName" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phoneNumber" className="form-label">Phone numbers:</label>
                      <input type="phoneNumber" className="form-control" id="phoneNumber" placeholder="Enter your phone number" name="phoneNumber" onChange={handleChange} />
                    </div>
                    <div className='mb-3 d-flex justify-content-around'>
                      <button type="submit" className="btn btn-primary">Register</button>
                      <button type="btn" className="btn btn-danger" onClick={handleReset}>Reset</button>

                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Register;
