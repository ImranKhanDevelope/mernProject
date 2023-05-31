import React from "react";
import { NavLink } from "react-router-dom";
import "./logo.css";

const Logo = () => {
  return (
    <>
      <div className="logo">
        <NavLink to="/">
          f<span>A</span>do
        </NavLink>
      </div>
      <div className="nav-toggler">
        <span></span>
      </div>
    </>
  );
};

export default Logo;
