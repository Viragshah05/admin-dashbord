import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <h1>VIRAG</h1>
      <ul>
        <NavLink to={"/dashboard"}>
          <li>Dashboard</li>
        </NavLink>
        <NavLink to={"/home"}>
          <li>Home</li>
        </NavLink>
        <NavLink to={"/about"}>
          <li>About</li>
        </NavLink>
        <NavLink to={"/product"}>
          <li>Product</li>
        </NavLink>
        <NavLink to={"/jobs"}>
          <li>Job</li>
        </NavLink>
      </ul>
      <button>Get Started</button>
    </div>
  );
};

export default Navbar;
