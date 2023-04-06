/* eslint-disable no-unused-vars */
const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const { usersInDb } = require("../tests/test_helper");

// -- API/BLOGS

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "user not authenticated" });
  }

  if (!body.likes) {
    body.likes = 0;
  } else if (!body.title || !body.url) {
    return res.status(400).json("Missing body parts.");
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

// -- API/BLOGS/:ID

blogRouter.put("/:id", async (req, res, next) => {
  const body = req.body;

  const blog = {
    likes: body.likes,
  };

  const updated = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updated);
});

blogRouter.delete("/:id", async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "user not authenticated" });
  }
  console.log("WHOS THE USER HERE IN DELETE?", user);

  const blog = await Blog.findById(req.params.id);
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } else {
    return res
      .status(401)
      .json({ error: "user has no rights to delete this blog." });
  }
});

module.exports = blogRouter;
