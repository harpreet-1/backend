const mongoose = require("mongoose");

require("dotenv").config();

const connection = () => {
  try {
    mongoose.connect(process.env.DB_URL);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { connection };
