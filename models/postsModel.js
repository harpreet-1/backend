const mongoose = require("mongoose");
const postschema = mongoose.Schema({
  title: { type: String, require: true },
  body: { type: String, require: true },
  device: { type: String, require: true },
  no_of_comments: { type: Number, default: 0 },
  userID: { type: String, require: true },
});

const postModel = mongoose.model("post", postschema);

module.exports = { postModel };
