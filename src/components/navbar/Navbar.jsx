import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  // const { userName } = useSelector((state) => state.auth);
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const [logout, setLogout] = useState(false);

  const handleLogout = (e) => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setLogout(true);
  };
  return (
    <div className='navbar'>
      <div className='navContainer'>
        <span className='logo btn btn-warning'>
          <Link to={"/"}>Booking Website</Link>
        </span>
        <div className='navItems'>
          {userId ? (
            <div>
              <button className='navButton btn btn-success'>
                <Link to={"/"}>User: {userName || ""}</Link>
              </button>
              <button className='navButton btn btn-success'>
                <Link to={"/transaction"}>Transaction</Link>
              </button>
              <button
                onClick={handleLogout}
                className='navButton btn btn-danger'>
                Log out
              </button>
            </div>
          ) : (
            <div>
              <button className='navButton'>
                <Link to={"/register"}>Register</Link>
              </button>
              <button className='navButton'>
                <Link to={"/login"}>Login</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
