const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', (req, res) => {
	res.send('<h1>TOIMII??</h1>')
})

router.post('/reset', async (req, res) => {
	await Blog.deleteMany({})
	await User.deleteMany({})

	res.status(200).json({ message: 'database reset succesful' })
	res.status(204).end()
})

module.exports = router