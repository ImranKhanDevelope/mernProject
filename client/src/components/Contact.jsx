import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import EmailIcon from "@mui/icons-material/Email";
import MyLocationIcon from "@mui/icons-material/MyLocation";
// import Form from "react-bootstrap/Form";
import PersonIcon from "@mui/icons-material/Person";
import "./Contact.css";

const Contact = () => {
  const navigate = useNavigate();
  const [userData, setUserdata] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const callContactpage = async () => {
    try {
      const res = await fetch("/callContact", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserdata({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      if (res.status !== 200) {
        throw new Error("UNauthorised: user not found");
      }
    } catch (error) {
      navigate("/signin");
      console.log(error);
    }
  };

  useEffect(() => {
    callContactpage();
  }, []);
  // storing message in mongodb
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserdata({
      ...userData,
      [name]: value,
    });
  };
  const sendData = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, message }),
    });
    const data = await res.json();
    if (!data) {
      console.log("message not sent");
    } else {
      alert("MESSAGE SENT");
      setUserdata({ ...userData, message: "" });
    }
  };
  return (
    <>
      <Container className="contain">
        <Row className="rowclass">
          <Col className="colum">
            <SmartphoneIcon />
            <div className="col-item">
              <div className="col_title">Phone</div>
              <div className="col_text">+91 7981412723</div>
            </div>
          </Col>
          <Col className="colum">
            <EmailIcon />
            <div className="col-item">
              <div className="col_title">Email</div>
              <div className="col_text">ghudusabimran@gmail.com</div>
            </div>
          </Col>
          <Col className="colum">
            <MyLocationIcon />
            <div className="col-item">
              <div className="col_title">Phone</div>
              <div className="col_text">location</div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="form_class">
        <form method="POST" className="cform">
          <h2>Get in touch</h2>
          <Container>
            <Row className="input-row">
              <Col className="colum">
                <PersonIcon />
                <input
                  type="text"
                  name="name"
                  id=""
                  value={userData.name}
                  onChange={handleInput}
                  className="cinput"
                  placeholder="Enter your name"
                />
              </Col>
              <Col className="colum">
                <EmailIcon />
                <input
                  type="text"
                  name="email"
                  id=""
                  value={userData.email}
                  onChange={handleInput}
                  className="cinput"
                  placeholder="Enter your mail"
                />
              </Col>
              <Col className="colum">
                <SmartphoneIcon />
                <input
                  type="number"
                  name="phone"
                  className="cinput"
                  value={userData.phone}
                  onChange={handleInput}
                  id=""
                  placeholder="Enter your number"
                />
              </Col>
            </Row>
          </Container>
          <br />
          <textarea
            id=""
            cols={75}
            onChange={handleInput}
            name="message"
            rows={5}
            style={{ marginLeft: "50px", resize: "none" }}
            placeholder="Enter your message"
          />
          <br />
          <input
            onClick={sendData}
            type="submit"
            value="send"
            className="cinput send"
          />
        </form>
      </div>
    </>
  );
};

export default Contact;
