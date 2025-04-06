import { NavLink } from "react-router";
import logo from "../assets/logo.png";
import cart from "../assets/cart.svg";
const Navbar = (props) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="px-4 py-2">
          <NavLink to="/">
            <img className="h-20 inline-block" src={logo}></img>
          </NavLink>
        </div>
        <div className="px-5 py-2">
          <NavLink to="/" className="mx-5">
            Home
          </NavLink>
          {props.dashboard != "notReq" && (
            <NavLink to="/userDashboard" className="mx-5">
              Dashboard
            </NavLink>
          )}
          {props.cart != "notReq" && (
            <NavLink to="/cart" className="mx-5">
              <img src={cart} className="h-10 inline-block"></img>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
