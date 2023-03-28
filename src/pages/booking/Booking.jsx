import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import axios from "axios";
import "./booking.css";
// import { useSelector } from "react-redux";

const Booking = () => {
  let { id } = useParams();
  const initialBookingData = {
    fullname: "",
    email: "",
    phoneNumber: "",
    IDcard: "",
  };
  //   const { userId } = useSelector((state) => state.auth);
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const [errorMessage, setErrorMessage] = useState("");
  const [hotel, setHotel] = useState({});
  const [rooms, setRoom] = useState([]);
  const [bookingData, setbookingData] = useState(initialBookingData);
  const [roomsBooked, setRoomsBooked] = useState([]);
  const [payment, setPayment] = useState("cash");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleChange = (e) => {
    setbookingData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  console.log();

  const [totalBill, setTotalBill] = useState(0);
  const handleOnCheck = (e, roomPrice) => {
    const day =
      (Date.parse(date[0].endDate) - Date.parse(date[0].startDate)) / 86400000 >
      0
        ? (Date.parse(date[0].endDate) - Date.parse(date[0].startDate)) /
          86400000
        : ((Date.parse(date[0].endDate) - Date.parse(date[0].startDate)) /
            86400000) *
          -1;
    const index = roomsBooked.findIndex((rBked) => rBked === e.target.value);
    console.log(index);
    if (e.target.checked) {
      setTotalBill(totalBill + roomPrice * day);
      if (index < 0) setRoomsBooked([...roomsBooked, e.target.value]); //immutable
    } else if (!e.target.checked) {
      setTotalBill(totalBill - roomPrice * day);
      if (index >= 0)
        setRoomsBooked(roomsBooked.filter((r) => r !== e.target.value));
      // slice, filter return a new array immutable coz we can't directly modify state, just copy and use spread operator
      //   setRoomsBooked([
      //     ...roomsBooked.slice(0, index),
      //     ...roomsBooked.slice(index + 1, roomsBooked.length),
      //   ]);
    }
  };
  console.log(bookingData);
  useEffect(() => {
    const fetchHotelById = async () => {
      try {
        const response = await axios({
          url: `http://localhost:5000/api/hotel/${id}`,
        });

        setHotel(response.data.hotel);
        setRoom(response.data.rooms);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchHotelById();
  }, []);

  const handleSubmit = async (e) => {
    const data = {
      user: userId,
      hotel: hotel._id,
      room: roomsBooked,
      dateStart: date[0].startDate,
      dateEnd: date[0].endDate,
      price: totalBill,
      payment: payment,
      status: "Booked",
    };
    console.log(data);
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:5000/api/hotel/${hotel._id}/booking`,
        data: data,
      });
      console.log(response.data);
      //   dispatch(signup(response.data));
      //   navigate("/login");
    } catch (error) {
      if (error) {
        setErrorMessage(error.message);
      }
    }
  };

  //   console.log(hotel);
  //   console.log(id);
  //   console.log(loading);

  return (
    <>
      <div>
        <Navbar />
        <Header type='list' />
        {/* loading will be false - true - false */}
        {hotel === undefined ? (
          <Loading />
        ) : (
          <div className='container mt-3 bg-light'>
            <div className='row '>
              <div className='col-8'>
                <h1 className=''>{hotel.name}</h1>
                <p className=''>{hotel.desc}</p>
              </div>
              <div className='col-4 bg-warning p-2 d-flex flex-column align-items-center'>
                <div className='mb-3 mt-3'>
                  <h2>
                    <b>${hotel.cheapestPrice}</b> (1 night(s))
                  </h2>
                </div>
                <div className='mb-3 mt-3'>
                  <button className='btn btn-primary'>
                    <Link to={"/booking"}>Reserve or Book Now!</Link>
                  </button>
                </div>
              </div>
              <div className='row mt-4'>
                <div className='col-12 col-md-5 d-flex flex-column align-items-center'>
                  <h3>
                    <b>Date:</b>
                  </h3>
                  {/* <FontAwesomeIcon
                    icon={faCalendarDays}
                    className='headerIcon'
                  /> */}
                  <span className='headerSearchText'>{`${format(
                    date[0].startDate,
                    "MM/dd/yyyy"
                  )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>

                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className='date bg-warning'
                    minDate={new Date()}
                  />
                </div>
                <div className='col-12 col-md-7'>
                  <div className='row d-flex justify-content-center ms-3'>
                    <div className=' card'>
                      <div className=' card-body'>
                        <form method='POST' onSubmit={handleSubmit}>
                          <h1 className='text-center'>Reverse info</h1>
                          <p className='text-medium-emphasis text-center'>
                            Create your account
                          </p>

                          <div className='mb-3 mt-3'>
                            <label htmlFor='fullname' className='form-label'>
                              Your Fullname
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              value={bookingData.fullname}
                              id='fullname'
                              placeholder='Enter fullname'
                              name='fullname'
                              onChange={handleChange}
                            />
                          </div>
                          <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>
                              Your Email:
                            </label>
                            <input
                              type='email'
                              className='form-control'
                              value={bookingData.email}
                              id='email'
                              placeholder='Enter email'
                              name='email'
                              onChange={handleChange}
                            />
                          </div>
                          <div className='mb-3'>
                            <label htmlFor='phoneNumber' className='form-label'>
                              Your Phone Numbers:
                            </label>
                            <input
                              type='tel'
                              className='form-control'
                              value={bookingData.phoneNumber}
                              id='phoneNumber'
                              placeholder='Enter your phone number'
                              name='phoneNumber'
                              pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
                              onChange={handleChange}
                            />
                          </div>
                          <div className='mb-3'>
                            <label htmlFor='phoneNumber' className='form-label'>
                              Your Identity Card Numbers:
                            </label>
                            <input
                              type='number'
                              className='form-control'
                              value={bookingData.IDcard}
                              id='IDcard'
                              placeholder='Enter your ID card number'
                              required
                              name='IDcard'
                              onChange={handleChange}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row mt-5'>
                  {rooms.map((room) => {
                    return (
                      <div key={room._id}>
                        <div className='col-6  '>
                          <div className='row d-flex justify-content-between'>
                            <div className='col-8'>
                              <h4>{room.title}</h4>
                              <p>{room.desc}</p>
                              <p>Max people: {room.maxPeople}</p>
                              <h4>${room.price}</h4>
                            </div>
                            <div className='col-4'>
                              {room.roomNumbers.map((rN) => {
                                return (
                                  <div key={rN}>
                                    <label htmlFor={rN}>{rN}</label>
                                    <input
                                      type='checkbox'
                                      id={rN}
                                      name={rN}
                                      value={rN}
                                      onChange={(e) =>
                                        handleOnCheck(e, room.price)
                                      }></input>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className='row '>
                  <div className='col-4 d-flex flex-column align-items-start '>
                    <h2>Total bill: {totalBill}</h2>
                    <label htmlFor='payment'>Select payment method:</label>
                    <br />
                    <select
                      className='form-select form-select-lg'
                      name='payment'
                      id='payment'
                      onChange={(e) => setPayment(e.target.value)}>
                      <option value='none' selected disabled hidden>
                        Select an Option
                      </option>
                      <option value='cash'>Cash</option>
                      <option value='card'>Card</option>
                    </select>
                  </div>
                  <div className='col-4 d-flex justify-content-center align-items-end'>
                    <button
                      type='btn'
                      onClick={handleSubmit}
                      className='btn btn-primary'>
                      Reverse now
                    </button>
                  </div>
                  <div className='col-4'></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <MailList />
        <Footer />
      </div>
    </>
  );
};

export default Booking;
