require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
const { response } = require('express')

// app.use(morgan('dev', function (tokens, req, res) {
// 	return [
// 		tokens.method(req, res),
// 		tokens.url(req, res),
// 		tokens.status(req, res),
// 		tokens.res(req, res, 'content-length'), '-',
// 		tokens['response-time'](req, res), 'ms',
// 		tokens.user-agent(req, res),
// 		JSON.stringify(req.body)
// 	].join(' ')
// }))

morgan.token('body', (req, resp) => JSON.stringify(req.body))
app.use(morgan('dev', ':method :url :status :res[content-length] - :response-time ms :body'))

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  console.log(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ err: 'malformatted id' })
  }
  else if (err.name === 'ValidationError') {
    return res.status(400).json({ err: err.message })
  }

  next(err)
}

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Howdy!')
})

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(`
			<p>Phonebook has info for ${persons.length} people</p>
			<p>${new Date()}</p>
		`)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    console.log('persons', persons)
    res.json(persons)
  })
})

//const generateId = (min, max) => {
//	min = Math.ceil(min);
//	max = Math.floor(max);
//	return (Math.floor(Math.random() * (max - min + 1) + min))

//}

app.post('/api/persons', (req, res, next) => {
  const name = req.body.name
  const number = req.body.number

  if (!name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }
  if (!number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }
  Person.findOne({ name }).then((person) => {
    if (person) {
      return res.status(400).json({
        error: 'name must be unique'
      })
    }
    else {
      const newDude = new Person({
        //id: generateId(persons.length + 1, 9999999),
        name: name,
        number: number,
      })
      newDude.save().then(savedPerson => {
        console.log('POST person', savedPerson)
        res.json(savedPerson)
      })
        .catch(error => next(error))
    }
  })
})


app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person)
        res.json(person)
      else
        res.status(404).end()
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const updateMe = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(req.params.id, updateMe, { new: true })
    .then(updatedPers => {
      res.json(updatedPers)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

//const PORT = 3001;
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}.`)
})
