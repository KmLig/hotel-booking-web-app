import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { useDispatch } from 'react-redux';
import { login } from '../../store/auth';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialLoginData = {
    email: "",
    password: ""
  };
  const [loginData, setLoginData] = useState(initialLoginData);
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    setLoginData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleReset = (e) => {
    setLoginData(initialLoginData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:5000/api/auth/login',
        data: loginData
      });
      dispatch(login(response.data));
      //
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      const userId = localStorage.getItem('userId');
      console.log(userId);
      //
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
      );
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      navigate("/");
    } catch (error) {
      if (error) {
        setErrorMessage(error.message);
      }
    }
  };

  console.log(loginData);
  return (
    <>
      <Navbar />
      <Header type='list' />
      <div className="bg-light d-flex mt-5 justify-content-center">
        <div className='container'>
          <div className=" row justify-content-center">
            <div className='col-6 '>
              {errorMessage ? (<h5 className='d-flex mb-3 justify-content-center btn btn-danger'>{errorMessage}</h5>) : ""}
              <div className=" card mx-4 ">
                <div className=" card-body p-4 ">
                  <form method='POST' onSubmit={handleLogin} >
                    <h1 className='text-center'>Login</h1>
                    <p className="text-medium-emphasis text-center">Login to book your favorite hotel</p>

                    <div className="mb-3 mt-3">
                      <label htmlFor="email" className="form-label">Email:</label>
                      <input type="email" className="form-control" value={loginData.email} id="email" placeholder="Enter email" name="email" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password:</label>
                      <input type="password" className="form-control" value={loginData.password} id="password" placeholder="Enter password" name="password" onChange={handleChange} required />
                    </div>
                    <div className='mb-3 d-flex justify-content-around'>
                      <button type="btn" className="btn btn-primary">Login</button>
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

export default Login;
