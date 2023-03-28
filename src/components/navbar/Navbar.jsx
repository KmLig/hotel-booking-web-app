import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const { userName } = useSelector((state) => state.auth);
  return (
    <div className='navbar'>
      <div className='navContainer'>
        <span className='logo btn btn-warning'>
          <Link to={"/"}>Booking Website</Link>
        </span>
        <div className='navItems'>
          {userName ? (
            <button className='navButton btn btn-warning'>
              <Link to={"/"}>User: {userName || ""}</Link>
            </button>
          ) : (
            ""
          )}

          <button className='navButton'>
            <Link to={"/register"}>Register</Link>
          </button>
          <button className='navButton'>
            <Link to={"/login"}>Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
