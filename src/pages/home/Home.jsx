import { Suspense } from "react";
import HotelByCity from "../../components/hotelByCity/HotelByCity";
import HotelByType from "../../components/hotelByType/HotelByType";
import HotelByRating from "../../components/hotelByRating/HotelByRating";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Loading from "../../components/loading/Loading";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Suspense fallback={Loading}>
        <div className='homeContainer'>
          <h1 className='homeTitle'>Find hotels in your favorite city</h1>
          <HotelByCity />
          <h1 className='homeTitle'>Browse by property type</h1>
          <HotelByType />
          <h1 className='homeTitle'>Homes guests love</h1>
          <HotelByRating />
          <MailList />
          <Footer />
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
