const { default: mongoose } = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => console.log("CONNECTION SUCCESSFUL !!!"))
  .catch((err) => console.log(err));
