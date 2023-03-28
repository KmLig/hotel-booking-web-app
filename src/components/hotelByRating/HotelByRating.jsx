import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadHotelsByRating } from "../../store/hotels";
import Loading from "../loading/Loading";
import "./hotelByRating.css";

const FeaturedItem = ({ hotel }) => {
  return (
    <div className='fpItem'>
      <Link to={`/hotels/${hotel._id}`}>
        <img src={hotel.photos[0] || ""} alt='' className='fpImg' />
        <span className='fpName'>{hotel.name}</span>
      </Link>
      <span className='fpCity'>{hotel.city}</span>
      <span className='fpPrice'>Starting from ${hotel.cheapestPrice}</span>
      <div className='fpRating'>
        <button>{hotel.rating}/5</button>
        <span>Excellent</span>
      </div>
    </div>
  );
};
const FeaturedProperties = () => {
  const dispatch = useDispatch();
  const { hotelsByRating, loading } = useSelector((state) => state.hotels);
  useEffect(() => {
    dispatch(loadHotelsByRating());
  }, []);
  return (
    <>
      {loading || hotelsByRating.length < 1 ? (
        <Loading />
      ) : (
        <Suspense fallback={Loading}>
          <div className='fp'>
            {hotelsByRating.map((h) => {
              return <FeaturedItem key={h._id} hotel={h} />;
            })}
          </div>
        </Suspense>
      )}
    </>
  );
};

export default FeaturedProperties;
