const logger = require('./logger')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('---')
  next()
}

// morgan.token('req-body', (req, res) => JSON.stringify(req.body))
morgan.token('req-body', function getbody (req) {
	return req.body
})


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res ,next) => {
  logger.error(error.message)

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	}
	else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	}
	else if (error.name === 'JsonWebTokenError') {
		return res.status(400).json({ error: 'token missing or invalid' })
	}
	else if (error.name === 'TokenExpiredError') {
		return res.status(401).json({ error: 'token expired' })
	}
	next(error)
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next()
}

const userExtractor = async (req, res, next) => {
	if (req.token) {
		const decodedToken = jwt.verify(req.token, process.env.SECRET)

		console.log('deco token', decodedToken)

		if (!decodedToken.id) {
			return res.status(401).json({ error: 'token invalid' })
		}

		const user = await User.findById(decodedToken.id)
		req.user = user
	}
	else
		req.user = null
	next()
}

module.exports = {
  requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor,
  morgan: morgan('dev', ':method :url :status :res[content-length] - :response-time ms :req-body')
}