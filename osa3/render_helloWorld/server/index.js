require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express()
const Note = require('./models/note');
const { response } = require('express');


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(express.json())
app.use(requestLogger)
app.use(cors())
// if you did the build
app.use(express.static('build'))

//let notes = [
//  {
//    id: 1,
//    content: "HTML is easy",
//    important: true
//  },
//  {
//    id: 2,
//    content: "Browser can execute only JavaScript",
//    important: false
//  },
//  {
//    id: 3,
//    content: "GET and POST are the most important methods of HTTP protocol",
//    important: true
//  }
//]

// const note = new Note({
// 	content: "Callback-functions suck",
// 	important: true
// })

// note.save().then(res => {
// 	console.log('saved note: ', res)
// 	mongoose.connection.close()
// })


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    console.log('notes', notes)
    res.json(notes)
  })
})

//const generateId = () => {
//  const maxId = notes.length > 0
//    ? Math.max(...notes.map(n => n.id))
//    : 0
//  return maxId + 1
//}

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    // id: generateId(),
  })

  note.save().then(savedNote => {
    console.log('saved note', savedNote)
    response.json(savedNote)
  })
    .catch(error => next(error))
})

// app.get('/api/notes/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const note = notes.find(note => note.id === id)

//   if (note) {
//     response.json(note)
//   } else {
//     response.status(404).end()
//   }
//   response.json(note)
// })
app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note)
      }
      else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

//app.delete('/api/notes/:id', (request, response) => {
//  const id = Number(request.params.id)
//  notes = notes.filter(note => note.id !== id)

//  response.status(204).end()
//})

app.put('/api/notes/:id', (req, res, next) => {
  const { content, important } = req.body

  //const note = {
  //  content: body.content,
  //  important: body.important
  //}

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
