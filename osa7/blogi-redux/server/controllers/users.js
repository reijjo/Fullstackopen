const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// -- /API/USERS

usersRouter.get('/', async (req, res) => {
	const users = await User
	.find({}).populate('blogs', 'url title author')

	res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
	const { username, password, name } = req.body

	if (!password) {
		return res.status(400).json({ error: 'empty password' })
	}
	else if (password.length < 3) {
		return res.status(400).json({ error: 'min password length is 3' })
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		passwordHash,
		name
	})

	try {
		const savedUser = await user.save()

		res.status(201).json(savedUser)
	}
	catch (error) {
		next(error)
	}
})

module.exports = usersRouter