const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

router.get('/', (req, res) => {
	res.send('<h1>hi!</h1>')
})

router.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router