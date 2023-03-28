import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadHotels } from "../../store/hotels";
import Loading from "../loading/Loading";
import "./HotelByCity.css";

const HotelByCity = () => {
  const dispatch = useDispatch();
  const { hotels, loading } = useSelector((state) => state.hotels);
  const hotelsHN = hotels.filter((h) => h.city === "Ha Noi") || [];
  const hotelsDN = hotels.filter((h) => h.city === "Da Nang") || [];
  const hotelsHCM = hotels.filter((h) => h.city === "Ho Chi Minh") || [];

  useEffect(() => {
    dispatch(loadHotels());
  }, []);
  return (
    <>
      {loading || hotels.length < 1 ? (
        <Loading />
      ) : (
        <div className='featured'>
          <div className='featuredItem'>
            <img
              src='https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o='
              alt=''
              className='featuredImg'
            />
            <div className='featuredTitles'>
              <h1>Hà Nội</h1>
              <h2>{hotelsHN.length} properties</h2>
            </div>
          </div>

          <div className='featuredItem'>
            <img
              src='https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o='
              alt=''
              className='featuredImg'
            />
            <div className='featuredTitles'>
              <h1>Đà Nẵng</h1>
              <h2>{hotelsDN.length} properties</h2>
            </div>
          </div>
          <div className='featuredItem'>
            <img
              src='https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o='
              alt=''
              className='featuredImg'
            />
            <div className='featuredTitles'>
              <h1>Hồ Chí Minh</h1>
              <h2>{hotelsHCM.length} properties</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelByCity;
