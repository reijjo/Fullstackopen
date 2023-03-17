require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express()
const Note = require('./models/note');
const { response } = require('express');

// const mongoose = require('mongoose');

// if (process.argv.length < 3) {
// 	console.log('Give password as argument.');
// 	process.exit(1);
// }

// const password = process.argv[2];

// const url = `mongodb+srv://reijjo:${password}@cluster0.0npwagm.mongodb.net/?retryWrites=true&w=majority`

// mongoose.set('strictQuery', false);
// mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
// 	content: String,
// 	important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema);

// noteSchema.set('toJSON', {
// 	transform: (document, returnedObject) => {
// 		returnedObject.id = returnedObject._id.toString()
// 		delete returnedObject._id
// 		delete returnedObject.__v
// 	}
// })

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

app.use(express.json())
app.use(requestLogger)
app.use(cors())
// if you did the build
app.use(express.static('build'))

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

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

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    // date: new Date(),
    // id: generateId(),
	})

  // notes = notes.concat(note)
	note.save().then(savedNote => {
		console.log('saved note', savedNote)
		response.json(savedNote)
		// response.json(note)
	})
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
app.get('/api/notes/:id', (req, res) => {
	Note.findById(req.params.id).then(note => {
		response.json(note)
	})
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
