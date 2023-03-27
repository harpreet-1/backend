const { postModel } = require("../../models/postsModel");
const { authorization } = require(".././middleware/authorization");

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const postRouter = express.Router();

const addPost = async (req, res) => {
  try {
    // res.json(req.body);
    const post = await postModel.create(req.body);
    return res.status(200).json({ message: "New post added " });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
const getPost = async (req, res) => {
  let min_comments = req.query.min_comments || -1;
  let max_comments = req.query.max_comments || 11111111;
  let page = 1;
  let limit = 100;
  let device1 = {};
  let device2 = {};
  let device3 = {};
  if (req.query.device1 || req.query.device) {
    device1 = { device: req.query.device1 || req.query.device };
    device2 = { device: req.query.device1 || req.query.device };
    device3 = { device: req.query.device1 || req.query.device };
  }
  if (req.query.device2) {
    device2 = { device: req.query.device2 };
  }
  if (req.query.device3) {
    device3 = { device: req.query.device3 };
  }
  console.log(min_comments, max_comments);
  if (req.query.page) {
    page = req.query.page;
    limit = 3;
  }
  let skip = (page - 1) * limit;

  try {
    const posts = await postModel
      .find({
        $and: [
          {
            userID: req.userID,
          },
          { no_of_comments: { $gte: min_comments } },
          { no_of_comments: { $lte: max_comments } },
          { $or: [device1, device2, device3] },
        ],
      })
      .skip(skip)
      .limit(limit);
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const posts = await postModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
const updatePost = async (req, res) => {
  try {
    const posts = await postModel.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({ message: "Post updated" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
const topPost = async (req, res) => {
  try {
    const posts = await postModel
      .find({ userID: req.userID })
      .sort("no_of_comments");
    return res.status(200).json(posts[posts.length - 1]);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

postRouter.use(authorization);

postRouter.post("/add", addPost);
postRouter.delete("/delete/:id", deletePost);
postRouter.patch("/update/:id", updatePost);
postRouter.get("/", getPost);
postRouter.get("/top", topPost);

module.exports = { postRouter };
