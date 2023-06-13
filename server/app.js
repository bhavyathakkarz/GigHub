const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Database Connected!");
  } catch (error) {
    console.log(error);
  }
};
app.listen(process.env.PORT, () => {
  console.log("Backend Server is running!");
  connect();
});
