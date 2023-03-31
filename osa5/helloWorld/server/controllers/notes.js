const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (req, res) => {
	const notes = await Note
	.find({}).populate('user', { username: 1, name: 1 })
	res.json(notes)
})

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
}


notesRouter.post('/', async (req, res) => {
	console.log('Request received at POST /api/notes');

	const body = req.body
	const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

	console.log('Token from request:', getTokenFrom(req))
	console.log('Decoded token:', decodedToken)


	if (!decodedToken.id) {
		return res.status(401).json({ error: 'token invalid' })
	}
	const user = await User.findById(decodedToken.id)

	console.log('Input userId:', body.userId)
	console.log('Found user:', user)

	const note = new Note({
		content: body.content,
		important: body.important || false,
		user: user._id
	})

	const savedNote = await note.save()
	user.notes = user.notes.concat(savedNote._id)
	await user.save()

	res.status(201).json(savedNote)
})

notesRouter.get('/:id', async (req, res) => {
	const note = await Note.findById(req.params.id)
	if (note) {
		res.json(note)
	}
	else {
		res.status(404).end()
	}
})

notesRouter.put('/:id', (req, res, next) => {
	const body = req.body

	const note = {
		content: body.content,
		important: body.important
	}

	Note.findByIdAndUpdate(req.params.id, note, { new: true })
		.then(updatedNote => {
			res.json(updatedNote)
		})
		.catch(error => next(error))
})

notesRouter.delete('/:id', async (req, res) => {
	await Note.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = notesRouter