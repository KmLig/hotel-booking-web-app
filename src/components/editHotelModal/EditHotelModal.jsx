import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import "./editHotelModal.css";

const EditHotelModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hotelId, setHotelId] = useState(location.state.hotelId);
  console.log(hotelId);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rooms, setRooms] = useState([]);
  const [hotelWithId, setHotelWithId] = useState({});
  // const [newHotel, setNewHotel] = useState({});
  useEffect(() => {
    const fetchHotelWithID = async () => {
      try {
        setIsLoading(true);
        const response = await axios({
          url: `http://localhost:5000/api/admin/hotels/${hotelId}`,
          method: "GET",
        });
        setHotelWithId(response.data.hotel);
        setIsLoading(false);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchHotelWithID();
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
    setHotelWithId((prevState) => {
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
        url: `http://localhost:5000/api/admin/editHotel/${hotelId}`,
        method: "PATCH",
        data: hotelWithId,
      });
      console.log(response.data);
      navigate("/hotel");
    } catch (error) {
      if (error) console.log(error);
    }
  };
  const cancelHandler = () => {
    navigate("/hotel");
  };
  console.log(hotelWithId);
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <div className='shadow rounded-3 p-3 my-3 text-muted'>
        <h3>Do you want to edit hotel {hotelWithId.name}?</h3>
        <button
          type='button'
          className='btn btn-warning me-2'
          data-bs-toggle='modal'
          data-bs-target='#staticBackdrop'>
          Edit
        </button>
        <button
          type='button'
          className='btn btn-outline-secondary'
          onClick={cancelHandler}>
          Come back
        </button>
      </div>

      {/* <!-- Modal --> */}
      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-xl'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='staticBackdropLabel'>
                Edit hotel
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>

            <div className='modal-body'>
              {isLoading ? (
                <Loading />
              ) : (
                <form
                  className='mx-auto shadow rounded-3 p-4'
                  onSubmit={submitHandler}>
                  <div className='row my-2 d-flex flex-row justify-content-center'>
                    <div className='col form-floating my-auto'>
                      <input
                        type='text'
                        className='form-control'
                        value={hotelWithId.name}
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
                        value={hotelWithId.type}
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
                        value={hotelWithId.city}
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
                        value={hotelWithId.address}
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
                        value={hotelWithId.distance}
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
                        value={hotelWithId.title}
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
                        value={hotelWithId.desc}
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
                        value={hotelWithId.cheapestPrice}
                        name='cheapestPrice'
                        required
                        onChange={handleChange}
                      />
                      <label
                        htmlFor='cheapestPrice'
                        className='form-label ms-2'>
                        Price
                      </label>
                    </div>
                  </div>
                  <div className='row my-2'>
                    <div className='col-5 form-floating'>
                      <input
                        type='text'
                        className='form-control'
                        value={hotelWithId.photos}
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
                    className='btn btn-outline-primary mx-auto text-center mt-4'
                    data-bs-dismiss='modal'
                    onClick={submitHandler}>
                    Edit hotel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHotelModal;
