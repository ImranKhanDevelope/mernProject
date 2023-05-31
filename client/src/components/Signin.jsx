import React, { useContext, useState } from "react";
import "./Signin.css";
import { NavLink, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import log from "../images/log.svg";
import { userContext } from "../App";

const Signin = () => {
  const { state, dispatch } = useContext(userContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, checkPassword] = useState("");

  const userLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();
    if (res.status === 400 || !data) {
      alert("Invalid email or password");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Loged in Sucessfully");
      navigate("/");
    }
  };

  return (
    <>
      <div className="body">
        <div class="containers">
          <div class="cover">
            <div class="front">
              <img src={log} alt="login" />
              <div class="text">
                <span class="text-1">
                  Every new friend is a <br /> new adventure
                </span>
                <span class="text-2">Let's get connected</span>
              </div>
            </div>
          </div>
          <div class="forms">
            <div class="form-content">
              <div class="login-form">
                <div class="title">Signin</div>
                <form method="POST" className="signinform">
                  <div class="input-boxes">
                    <div class="input-box">
                      <EmailIcon />
                      <input
                        id="email"
                        name="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div class="input-box">
                      <KeyIcon />
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => checkPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <div class="text">
                      <NavLink to="/signup">Forgot password?</NavLink>
                    </div>
                    <div class="button input-box">
                      <input
                        type="submit"
                        value="Sign In"
                        onClick={userLogin}
                        name="signin"
                      />
                    </div>
                    <div class="text sign-up-text">
                      Don't have an account?
                      <NavLink to="/signup" for="flip">
                        Sigup now
                      </NavLink>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
