const { userModel } = require("../../models/userModel");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found, please register" });
    }
    bcrypt.compare(
      req.body.password,
      user.password,
      async function (err, result) {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        const token = await jwt.sign({ userID: user._id }, "sktiman", {
          expiresIn: "1h",
        });
        res.status(200).json({ user: user, token: token });
      }
    );
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const regigterUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist, please login" });
    }
    bcrypt.hash(req.body.password, 4, async function (err, hash) {
      if (err) {
        return res.status(400).json({ message: error.message });
      }
      req.body.password = hash;
      const newuser = await userModel.create(req.body);
      return res.json(newuser);
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

userRouter.post("/login", loginUser);
userRouter.post("/register", regigterUser);

module.exports = { userRouter };
