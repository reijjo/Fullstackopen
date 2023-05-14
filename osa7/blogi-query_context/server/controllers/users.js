/* eslint-disable quotes */
/* eslint-disable semi */
const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

// -- /API/USERS

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", "url title author");

  res.json(users);
});

usersRouter.post("/", async (req, res, next) => {
  const { username, password, name } = req.body;

  if (!password) {
    return res.status(400).json({ error: "empty password" });
  } else if (password.length < 3) {
    return res.status(400).json({ error: "min password length is 3" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
    name,
  });

  try {
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

// API/USERS/ID

usersRouter.get("/:id", async (req, res) => {
  const id = req.params;
  console.log("id", id.id);
  const user = await User.findOne({ _id: id.id });
  const blogs = await Blog.find({ user: id.id });
  console.log(blogs);

  res.json({ user, blogs });
});

module.exports = usersRouter;
