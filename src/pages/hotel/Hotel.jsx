import React, { useEffect } from "react";
import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadHotels } from "../../store/hotels";
import Loading from "../../components/loading/Loading";

const Hotel = () => {
  // const { state } = useLocation();
  let { id } = useParams();
  const dispatch = useDispatch();
  const { hotels, loading } = useSelector((state) => state.hotels);
  const hotel = hotels.filter((h) => h._id === id)[0];

  useEffect(() => {
    dispatch(loadHotels());
  }, []);

  console.log(hotel);
  console.log(id);
  console.log(loading);

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber =
        slideNumber === 0 ? hotel.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber === hotel.photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <>
      <div>
        <Navbar />
        <Header type='list' />
        {/* loading will be false - true - false */}
        {loading || hotel === undefined ? (
          <Loading />
        ) : (
          <div className='hotelContainer'>
            {open && (
              <div className='slider'>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className='close'
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className='arrow'
                  onClick={() => handleMove("l")}
                />
                <div className='sliderWrapper'>
                  <img
                    src={hotel.photos[slideNumber]}
                    alt=''
                    className='sliderImg'
                  />
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className='arrow'
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            <div className='hotelWrapper'>
              <button className='bookNow'>
                <Link to={"booking"}>Reserve or Book Now!</Link>
              </button>
              <h1 className='hotelTitle'>{hotel.name}</h1>
              <div className='hotelAddress'>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{hotel.address}</span>
              </div>
              <span className='hotelDistance'>
                Excellent location – 500m from center
              </span>
              <span className='hotelPriceHighlight'>
                Book a stay over $114 at this property and get a free airport
                taxi
              </span>
              <div className='hotelImages'>
                {hotel.photos
                  ? hotel.photos.map((photo, i) => (
                      <div className='hotelImgWrapper' key={i}>
                        <img
                          onClick={() => handleOpen(i)}
                          src={photo}
                          alt=''
                          className='hotelImg'
                        />
                      </div>
                    ))
                  : ""}
              </div>
              <div className='hotelDetails'>
                <div className='hotelDetailsTexts'>
                  <h1 className='hotelTitle'>{hotel.title && hotel.title}</h1>
                  <p className='hotelDesc'>{hotel.desc}</p>
                </div>
                <div className='hotelDetailsPrice'>
                  <h1>Perfect for a 9-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${hotel.cheapestPrice}</b> (9 nights)
                  </h2>
                  <button>
                    <Link to={"booking"}>Reserve or Book Now!</Link>
                  </button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div>
        )}
      </div>
    </>
  );
};

export default Hotel;
