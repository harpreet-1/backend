const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./controller/routes/userRoutes");
const { postRouter } = require("./controller/routes/postRouter");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.listen(4500, () => {
  connection();
  console.log("server is running");
});
