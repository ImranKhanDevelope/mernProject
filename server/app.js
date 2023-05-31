const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;

// Connecting to database

require("./db/conn");
app.use(express.json());

// connecting files using ROUTER

app.use(require("./router/auth"));

// const User = require("./modal/userSchema");

// Middleware

// const middleware = (req, res, next) => {
//   console.log("hello to my middleware");
//   next();
// };

// app.get("/", (req, res) => {
//   res.send("HELLO WORLD{from server}");
// });
// app.get("/about", middleware, (req, res) => {
//   console.log("hello to my about");
//   res.send("<h1>THIS IS ABOUT PAGE</h1>");
// });
// app.get("/contact", (req, res) => {
//   res.send("<h1>THIS IS CONTACT PAGE</h1>");
// });
app.get("/signin", (req, res) => {
  res.send("<h1>THIS IS SIGN IN PAGE</h1>");
});
app.post("/signup", (req, res) => {
  res.send("<h1>THIS IS SIGNUP PAGE</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is listning at port number ${PORT}`);
});
