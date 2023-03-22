const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('blogs ID must be named "id"', async () => {
	const response = await api.get('/api/blogs')
	// console.log('response body', response.body.map(i => i))
	// const contents = response.body.map(i => i._id)
	const contents = response.body.map(i => {
		expect(i.id).toBeDefined()
	})
	expect(contents).toBeDefined()
})

test('a valid new blog can be added', async () => {
	const firstRes = await api.get('/api/blogs')
	console.log(firstRes.body)

	const newBlog = {
		title: 'Vanhaa putkeen!',
		author: 'Liisa',
		url: 'ficomnet',
		likes: 11
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const res = await api.get('/api/blogs')
	const contents = res.body.map(i => i)
	expect(contents).toHaveLength(firstRes.body.length + 1)
})

afterAll(async () => {
	await mongoose.connection.close()
})
