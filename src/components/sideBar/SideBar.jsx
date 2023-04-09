import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faDashboard,
  faHome,
  faHotel,
  faMoneyBill,
  faSignOut,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sideBar.css";

const SideBar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const handleClick = (e) => {
    setActive(e.target.id);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    onLogout();
    navigate("/");
  };

  return (
    <div className='sidebar'>
      <nav
        className='nav flex-column nav-pills nav-fill shadow'
        id='sidebar-nav'>
        <Link className='text-bg-dark nav-link shadow rounded-0'>MAIN</Link>
        <Link
          className={
            active === "dashboard"
              ? "text-bg-info shadow  nav-link rounded-5"
              : "nav-link rounded-0"
          }
          id='dashboard'
          to={"/dashboard"}
          onClick={handleClick}>
          <FontAwesomeIcon icon={faDashboard} /> Dashboard
        </Link>
        <Link
          className={
            active === "users"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link rounded-0"
          }
          id='users'
          to={"/user"}
          onClick={handleClick}>
          <FontAwesomeIcon icon={faUser} /> Users
        </Link>
        <Link
          className={
            active === "hotels"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link rounded-0"
          }
          id='hotels'
          to={"/hotel"}
          onClick={handleClick}>
          <FontAwesomeIcon icon={faHotel} /> Hotels
        </Link>
        <Link
          className={
            active === "rooms"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link rounded-0"
          }
          id='rooms'
          to={"/room"}
          onClick={handleClick}>
          <FontAwesomeIcon icon={faHome} /> Rooms
        </Link>
        <Link
          className={
            active === "transactions"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link rounded-0"
          }
          id='transactions'
          to={"/transaction"}
          onClick={handleClick}>
          <FontAwesomeIcon icon={faMoneyBill} /> Transactions
        </Link>
        <Link className='text-bg-dark nav-link shadow rounded-0'>NEW</Link>
        <Link
          className={
            active === "newHotels"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link rounded-0"
          }
          id='newHotels'
          to={"/newHotel"}
          onClick={handleClick}>
          <FontAwesomeIcon icon={faHotel} /> New hotels
        </Link>
        <Link
          className={
            active === "newRooms"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link rounded-0"
          }
          id='newRooms'
          to={"/newRoom"}
          onClick={handleClick}>
          <FontAwesomeIcon icon={faUserFriends} /> New rooms
        </Link>
        <Link className='text-bg-dark nav-link shadow rounded-0'>USER</Link>
        <button
          className={
            active === "logOut"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link rounded-0"
          }
          onClick={logoutHandler}>
          <FontAwesomeIcon icon={faSignOut} /> Logout
        </button>
      </nav>
    </div>
  );
};

export default SideBar;
