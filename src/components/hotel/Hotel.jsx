import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditHotelModal from "../editHotelModal/EditHotelModal";
import Loading from "../loading/Loading";

const Hotel = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [hotels, setHotels] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios({
          url: `http://localhost:5000/api/admin/hotels`,
          method: "GET",
        });
        console.log(response.data);
        setHotels(response.data.hotels);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchTransaction();
  }, []);

  const editHandler = (e, hotelId) => {
    console.log(hotelId);
    navigate(`/editHotel/${hotelId}`, { state: { hotelId: hotelId } });
  };

  const deleteHandler = async (e, hotelId) => {
    console.log(hotelId);
    if (window.confirm("Do you want to delete this hotel?") === true) {
      try {
        const response = await axios({
          url: `http://localhost:5000/api/admin/deleteHotel/${hotelId}`,
          method: "DELETE",
        });
        setHotels(response.data.result);
      } catch (error) {
        if (error) {
          console.log(error.message);
        }
      }
    }
  };
  console.log(hotels);
  return (
    <div className='container'>
      <div className='d-flex flex-row justify-content-between p-3 align-items-center'>
        <h1>Your hotel list</h1>
        <Link
          className='btn btn-outline-success align-items-center rounded-5'
          to={"/newHotel"}>
          Add hotels
        </Link>
      </div>
      <table className='table text-center table-sm align-middle shadow'>
        <thead className='bg-light shadow'>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Name</th>
            <th scope='col'>Type</th>
            <th scope='col'>Title</th>
            <th scope='col'>City</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody className='table-group-divider'>
          {hotels.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <Loading />
              </td>
            </tr>
          ) : (
            hotels.map((hotel) => {
              return (
                <tr key={hotel._id}>
                  <th scope='row'>{hotel._id}</th>
                  <td>{hotel.name}</td>
                  <td>{hotel.type}</td>
                  <td>{hotel.title}</td>
                  <td>{hotel.city}</td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-outline-warning me-2'
                      onClick={(e) => editHandler(e, hotel._id)}>
                      Edit
                    </button>
                    <button
                      className='btn btn-outline-danger'
                      onClick={(e) => deleteHandler(e, hotel._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Hotel;
