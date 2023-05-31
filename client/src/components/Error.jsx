import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="error">
        <NavLink className="errorbtn" to="/">
          Go back to homepage
        </NavLink>
      </div>
    </>
  );
};

export default Error;
