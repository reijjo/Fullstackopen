/* eslint-disable semi */
/* eslint-disable quotes */
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

// -- API/BLOGS

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const body = req.body;
  const user = req.user;
  console.log("BACK body", body);
  console.log("BACK user", user);
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
  await savedBlog.populate("user", { name: 1, username: 1 });
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json({
    savedBlog,
    message: `a new blog '${body.title}' by ${body.author}`,
  });
});

// -- API/BLOGS/:ID

blogRouter.get("/:id", async (req, res) => {
  const id = req.params;
  const blog = await Blog.findById(id.id);

  console.log("blog", blog.user);
  const user = await User.findById(blog.user);
  res.json({ blog, user });
});

blogRouter.put("/:id", async (req, res) => {
  const body = req.body;
  console.log("BACK", body);

  const updatedBlog = {
    likes: body.likes + 1,
  };

  const updated = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {
    new: true,
  });
  res.json(updated);
});

blogRouter.delete("/:id", async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "user not authenticated" });
  }
  console.log("WHOS THE USER HERE IN DELETE?", user);

  const blog = await Blog.findById(req.params.id);

  console.log("blog.user", blog);

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } else {
    return res
      .status(401)
      .json({ error: "user has no rights to delete this blog." });
  }
});

blogRouter.post("/:id/comments", async (req, res) => {
  const id = req.params;
  const comment = req.body.comment;

  console.log("hep", comment);

  const blog = await Blog.findById(id.id);
  blog.comments = blog.comments.concat(comment);
  const updateBlog = await blog.save();

  console.log("updatedBlog", updateBlog);

  res.json(updateBlog);
});

module.exports = blogRouter;
