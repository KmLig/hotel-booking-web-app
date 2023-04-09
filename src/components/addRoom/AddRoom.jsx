import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const navigate = useNavigate();
  const [newRoom, setNewRoom] = useState({});
  const handleChange = (e) => {
    setNewRoom((prevState) => {
      if (e.target.name === "roomNumbers") {
        return {
          ...prevState,
          [e.target.name]: e.target.value.split(", "),
        };
      }

      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  console.log(newRoom);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: "http://localhost:5000/api/admin/addRoom",
        method: "POST",
        data: newRoom,
      });
      console.log(response.data.message);
      navigate("/room");
    } catch (error) {
      if (error) console.log(error);
    }
  };
  return (
    <div className='container'>
      <h3 className='shadow rounded-3 p-3 my-3 text-success'>Add new room</h3>
      <form
        className='mx-auto my-3 shadow rounded-3 p-5'
        onSubmit={submitHandler}>
        <div className='row my-2'>
          <div className='col form-floating'>
            <input
              type='text'
              className='form-control'
              placeholder='Ex: Ho Chi Minh City'
              name='title'
              required
              onChange={handleChange}
            />
            <label htmlFor='title' className='form-label ms-2'>
              Title
            </label>
          </div>
          <div className='col-2 form-floating my-auto'></div>
          <div className='col form-floating'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter hotel type'
              name='desc'
              required
              onChange={handleChange}
            />
            <label htmlFor='desc' className='form-label ms-2'>
              Description
            </label>
          </div>
        </div>
        <div className='row my-2'>
          <div className='col form-floating'>
            <input
              type='number'
              className='form-control'
              placeholder='Ex: Ho Chi Minh City'
              name='maxPeople'
              required
              onChange={handleChange}
            />
            <label htmlFor='maxPeople' className='form-label ms-2'>
              Max people
            </label>
          </div>
          <div className='col-2 form-floating my-auto'></div>
          <div className='col form-floating'>
            <input
              type='number'
              className='form-control'
              placeholder='Ex: Ho Chi Minh City'
              name='price'
              required
              onChange={handleChange}
            />
            <label htmlFor='price' className='form-label ms-2'>
              Price
            </label>
          </div>
        </div>
        <div className='row my-2'>
          <div className='col-5 form-floating'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter hotel name'
              name='roomNumbers'
              required
              onChange={handleChange}
            />
            <label htmlFor='roomNumbers' className='form-label ms-2'>
              Room Numbers - split by ", "
            </label>
          </div>
        </div>
        <div className=''></div>
        <button
          type='submit'
          className='btn btn-outline-success rounded-5 mx-auto text-center mt-4 fw-semibold'
          onClick={submitHandler}>
          Add room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
