import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
// import PersonIcon from "@mui/icons-material/Person";
// import EmailIcon from "@mui/icons-material/Email";
// import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
// import WorkIcon from "@mui/icons-material/Work";
// import KeyIcon from "@mui/icons-material/Key";
import register from "../images/register.svg";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const regisTer = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (res.status === 404 || !data) {
      window.alert("invalid registration");
      console.log("invalid registration");
    } else {
      window.alert("registration successful");
      navigate("/signin");
    }
  };
  return (
    <>
      <body>
        <div className="wrapper">
          <div className="inner">
            <div className="image-holder">
              <img src={register} alt="register" />
            </div>
            <form method="POST" id="registerform" className="registerform">
              <h3>Signup</h3>
              <div className="form-wrapper">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={user.name}
                  autoComplete="off"
                  onChange={handleInputs}
                  placeholder="Your Name"
                  className="form-control"
                />
              </div>
              <div className="form-wrapper">
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={user.email}
                  autoComplete="off"
                  onChange={handleInputs}
                  placeholder="Email Address"
                  className="form-control"
                />
              </div>
              <div className="form-wrapper">
                <input
                  id="number"
                  type="number"
                  name="phone"
                  value={user.phone}
                  autoComplete="off"
                  onChange={handleInputs}
                  placeholder="Mobile Number"
                  className="form-control"
                />
              </div>

              <div className="form-wrapper">
                <input
                  type="text"
                  id="work"
                  name="work"
                  value={user.work}
                  autoComplete="off"
                  onChange={handleInputs}
                  placeholder="profession"
                  className="form-control"
                />
              </div>
              <div className="form-wrapper">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={user.password}
                  autoComplete="off"
                  onChange={handleInputs}
                  placeholder="Password"
                  className="form-control"
                />
              </div>
              <div class="form-wrapper">
                <input
                  id="cpassword"
                  type="password"
                  name="cpassword"
                  value={user.cpassword}
                  autoComplete="off"
                  onChange={handleInputs}
                  placeholder="Confirm Password"
                  className="form-control"
                />
              </div>
              <input
                type="submit"
                name="signup"
                className="submit"
                value="Sign Up"
                onClick={regisTer}
              />
            </form>
          </div>
        </div>
      </body>
    </>
  );
};

export default Signup;
