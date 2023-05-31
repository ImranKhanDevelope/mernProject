import React, { useEffect, useState } from "react";
import "./About.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [userData, setUserdata] = useState({});
  const callAboutpage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUserdata(data);
      if (res.status !== 200) {
        throw new Error("UNauthorised: user not found");
      }
    } catch (error) {
      navigate("/signin");
      console.log(error);
    }
  };

  useEffect(() => {
    callAboutpage();
  }, []);
  return (
    <>
      <div className="aboutcontainer">
        <form method="GET" className="aboutBox">
          <div className="mainimgsec">
            <div className="imgsec">
              <img
                className="profile"
                src="https://myportfolio-js.netlify.app/images/hero.png"
                alt="profile"
              />
            </div>
            <div className="socialicons">
              <p>follow us on</p>
              <div className="icons_1">
                <FacebookIcon className="abouticon" />
                <InstagramIcon className="abouticon" />
                <LinkedInIcon className="abouticon" />
              </div>
            </div>
          </div>

          <div className="textsec">
            <div class="arow">
              <div class="info-item padd-15">
                <p>
                  User ID : <span>{userData._id}</span>
                </p>
              </div>
              <div class="info-item padd-15">
                <p>
                  Name :<span>{userData.name}</span>
                </p>
              </div>
              <div class="info-item padd-15">
                <p>
                  Email : <span>{userData.email}</span>
                </p>
              </div>
              <div class="info-item padd-15">
                <p>
                  Phone : <span>{userData.phone}</span>
                </p>
              </div>
              <div class="info-item padd-15">
                <p>
                  Profession : <span>{userData.work}</span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
