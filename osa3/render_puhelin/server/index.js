const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

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

app.use(express.json());
app.use(cors())

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-12346'
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523'
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345'
	},
	{
		id: 4,
		name: 'Mary Poppendick',
		number: '39-23-6423122'
	},
]

app.get('/', (req, res) => {
	res.send('Howdy!');
})

app.get('/info', (req, res) => {
	res.send(`
		<p>Phonebook has info for ${persons.length} people</p>
		<p>${new Date()}</p>
	`)
})

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

const generateId = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return (Math.floor(Math.random() * (max - min + 1) + min))

}

app.post('/api/persons', (req, res) => {
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
	if (persons.find(names => names.name === name)) {
		return res.status(400).json({
			error: 'name must be unique'
		})
	}
	if (persons.find(numbers => numbers.number === number)) {
		return res.status(400).json({
			error: 'number must be unique'
		})
	}

	const newDude = {
		id: generateId(persons.length + 1, 9999999),
		name: name,
		number: number,
	}

	persons = persons.concat(newDude);
	console.log('POST person', newDude)
	res.json(newDude)
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	console.log('get id', id)
	const person = persons.find(person => person.id === id);
	console.log('get person', person)
	if (person) {
		res.json(person)
	}
	else {
		res.status(404).end();
	}
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	console.log('delete id', id)
	persons = persons.filter(person => person.id !== id)
	console.log('persons after delete', persons)
	res.status(204).end()
})

app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server on port ${PORT}.`)
})