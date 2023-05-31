const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleWare/authenticate");

require("../db/conn");
const User = require("../modal/userSchema");

router.get("/", (req, res) => {
  res.send("HELLO WORLD {from server ROUTER}");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "please fill the credentials" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password doesnot matches" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      // here
      await user.save();
      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// login route ---------======

router.post("/signin", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "please fill the credentials" });
    }

    const userlogin = await User.findOne({ email: email });

    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      token = await userlogin.generateAuthToken();
      // console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ message: "Invalid credentials" });
      } else {
        res.json({ message: "U have entered successfully" });
      }
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// about us ka dynamic ppage

router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});
// contact us ka dynamic page

router.get("/callContact", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// SENDING DATA OF CONTACT PAGE

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log("contact form error");
      return res.json({ error: "plzz fill the contact form" });
    }

    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.json({ message: "message sent" });
    }
  } catch (error) {
    console.log(error);
  }
});

// logout ka dynamic ppage

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken");
  res.status(200).send("User Logout");
  next();
});

module.exports = router;
