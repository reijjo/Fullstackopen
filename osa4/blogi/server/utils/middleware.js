const logger = require('./logger')
const morgan = require('morgan')

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
  next(error)
}

module.exports = {
  requestLogger, unknownEndpoint, errorHandler,
  morgan: morgan('dev', ':method :url :status :res[content-length] - :response-time ms :req-body')
}