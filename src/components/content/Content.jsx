import React, { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AddHotel from "../addHotel/AddHotel";
import AddRoom from "../addRoom/AddRoom";
import Dashboard from "../dashboard/Dashboard";
import EditHotelModal from "../editHotelModal/EditHotelModal";
import Hotel from "../hotel/Hotel";
import Room from "../room/Room";
import Transaction from "../transaction/Transaction";
import User from "../user/User";
import EditRoomlModal from "../editRoom/EditRoomModal";

const Content = ({ isAuth }) => {
  const RequireAuth = ({ children }) => {
    const location = useLocation();
    return isAuth === true ? (
      children
    ) : (
      <Navigate to='/login' replace state={{ path: location.pathname }} />
    );
  };
  return (
    <div>
      <Routes>
        <Route
          path='/dashboard'
          name='Dashboard'
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path='/user'
          name='User'
          element={
            <RequireAuth>
              <User />
            </RequireAuth>
          }
        />
        <Route
          path='/hotel'
          name='Hotel'
          element={
            <RequireAuth>
              <Hotel />
            </RequireAuth>
          }
        />
        <Route
          path='/editHotel/:hotelId'
          name='Edit Hotel'
          element={
            <RequireAuth>
              <EditHotelModal />
            </RequireAuth>
          }
        />
        <Route path='/room' name='Room' element={<Room />} />
        <Route
          path='/editRoom/:roomId'
          name='Edit Room'
          element={
            <RequireAuth>
              <EditRoomlModal />
            </RequireAuth>
          }
        />
        <Route
          path='/newHotel'
          name='Room'
          element={
            <RequireAuth>
              <AddHotel />
            </RequireAuth>
          }
        />
        <Route
          path='/newRoom'
          name='Room'
          element={
            <RequireAuth>
              <AddRoom />
            </RequireAuth>
          }
        />
        <Route
          path='/transaction'
          name='Transaction'
          element={
            <RequireAuth>
              <Transaction />
            </RequireAuth>
          }
        />
        <Route path='/' element={<Navigate to='/dashboard' replace />} />
      </Routes>
    </div>
  );
};

export default Content;
