import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

const AddHotel = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [rooms, setRooms] = useState([]);
  const [newHotel, setNewHotel] = useState({});
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios({
          url: "http://localhost:5000/api/admin/rooms",
          method: "GET",
        });
        setRooms(response.data.rooms);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchRooms();
  }, []);
  const handleChange = (e) => {
    setNewHotel((prevState) => {
      if (e.target.name === "photos")
        return {
          ...prevState,
          [e.target.name]: e.target.value.split(","),
        };
      else if (e.target.name === "rooms") {
        const selectedOptions = e.target.selectedOptions;
        const newRooms = [];
        for (let i = 0; i < selectedOptions.length; i++) {
          newRooms.push(selectedOptions[i].value);
        }
        return {
          ...prevState,
          [e.target.name]: newRooms,
        };
      }

      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: "http://localhost:5000/api/admin/addHotel",
        method: "POST",
        data: newHotel,
      });
      console.log(response.data.message);
      navigate("/hotel");
    } catch (error) {
      if (error) console.log(error);
    }
  };
  console.log(newHotel);

  return (
    <div className='container'>
      <h3 className='shadow rounded-3 p-3 my-3 text-success'>Add new hotel</h3>
      {rooms.length < 0 ? (
        <Loading />
      ) : (
        <form
          className='mx-auto my-3 shadow rounded-3 p-5'
          onSubmit={submitHandler}>
          <div className='row my-2 d-flex flex-row justify-content-center'>
            <div className='col form-floating my-auto'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter hotel name'
                name='name'
                required
                onChange={handleChange}
              />
              <label htmlFor='name' className='form-label ms-2'>
                Name
              </label>
            </div>
            <div className='col-2 form-floating my-auto'></div>
            <div className='col form-floating'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter hotel type'
                name='type'
                required
                onChange={handleChange}
              />
              <label htmlFor='type' className='form-label ms-2'>
                Type
              </label>
            </div>
          </div>
          <div className='row my-2'>
            <div className='col form-floating'>
              <input
                type='text'
                className='form-control'
                placeholder='Ex: Ho Chi Minh City'
                name='city'
                required
                onChange={handleChange}
              />
              <label htmlFor='city' className='form-label ms-2'>
                City
              </label>
            </div>
            <div className='col-2 form-floating my-auto'></div>
            <div className='col form-floating'>
              <input
                type='text'
                className='form-control'
                placeholder='Ex: District 2'
                name='address'
                required
                onChange={handleChange}
              />
              <label htmlFor='address' className='form-label ms-2'>
                Address
              </label>
            </div>
          </div>
          <div className='row my-2'>
            <div className='col form-floating'>
              <input
                type='text'
                className='form-control'
                placeholder='Ex: 1.5km from donwtown'
                name='distance'
                required
                onChange={handleChange}
              />
              <label htmlFor='distance' className='form-label ms-2'>
                Distance from City center
              </label>
            </div>
            <div className='col-2 form-floating my-auto'></div>
            <div className='col form-floating'>
              <input
                type='text'
                className='form-control'
                placeholder='Ex: Best hotel of District 2'
                name='title'
                required
                onChange={handleChange}
              />
              <label htmlFor='title' className='form-label ms-2'>
                Title
              </label>
            </div>
          </div>
          <div className='row my-2'>
            <div className='col form-floating'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter hotel name'
                name='desc'
                required
                onChange={handleChange}
              />
              <label htmlFor='desc' className='form-label ms-2'>
                Description
              </label>
            </div>
            <div className='col-2 form-floating my-auto'></div>
            <div className='col form-floating'>
              <input
                type='number'
                className='form-control'
                placeholder='Enter hotel type'
                name='cheapestPrice'
                required
                onChange={handleChange}
              />
              <label htmlFor='cheapestPrice' className='form-label ms-2'>
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
                name='photos'
                required
                onChange={handleChange}
              />
              <label htmlFor='photos' className='form-label ms-2'>
                Photos || split by ","
              </label>
            </div>
            <div className='col-2 form-floating my-auto'></div>
            <div className='col form-floating'>
              <select
                className='form-select'
                name='featured'
                id='featured'
                required
                onChange={handleChange}>
                <option value='false'>No</option>
                <option value='true'>Yes</option>
              </select>
              <label htmlFor='featured' className='form-label ms-2'>
                Featured
              </label>
            </div>
            <div className='col form-floating'>
              <select
                className='form-select'
                name='rating'
                id='featured'
                required
                onChange={handleChange}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
              <label htmlFor='featured' className='form-label ms-2'>
                Rating
              </label>
            </div>
          </div>
          <div className='row my-2'>
            <div className='col text-start'>
              <label htmlFor='name' className='form-label'>
                Rooms:
              </label>
              <select
                className='form-select'
                size='4'
                aria-label='size 4 select example'
                name='rooms'
                required
                multiple
                onChange={handleChange}>
                {rooms.map((room) => {
                  return (
                    <option key={room._id} value={room._id}>
                      {room.desc}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className=''></div>
          <button
            type='submit'
            className='btn btn-outline-success rounded-5 mx-auto text-center mt-4 fw-semibold'
            onClick={submitHandler}>
            Add hotel
          </button>
        </form>
      )}
    </div>
  );
};

export default AddHotel;
