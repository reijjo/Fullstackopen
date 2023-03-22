const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// blogRouter.get('/', (req, res) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       res.json(blogs)
//     })
// })

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs)
})

blogRouter.post('/', async (req, res, next) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  // blog.save()
  //   .then(result => {
  //     res.status(201).json(result)
  //   })
  //   .catch(error => next(error))
	const savedBlog = await blog.save()
	res.status(201).json(savedBlog)
})

module.exports = blogRouter