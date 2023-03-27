const mongoose = require("mongoose");
const userschema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  gender: { type: String, require: true },
  password: { type: String, require: true },
  age: { type: Number, require: true },
  city: { type: String, require: true },
  is_married: { type: Boolean, require: true },
});

const userModel = mongoose.model("newUsers", userschema);

module.exports = { userModel };
