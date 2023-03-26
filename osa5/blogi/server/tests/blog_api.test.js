const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

const loginAndGetToken = async () => {
	const testUser = {
		username: 'testuser',
		password: 'testpassword'
	}

	const users = await api.get('/api/users')
	const existingUser = users.body.find(user => user.username === testUser.username)
	if (!existingUser) {
		await api.post('/api/users').send({
			username: testUser.username,
			name: ' Test User',
			password: testUser.password
		})
	}
	const res = await api.post('/api/login').send(testUser)
	return res.body.token
}

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

	const token = await loginAndGetToken()

	await api
		.post('/api/blogs')
		.set('Authorization', `Bearer ${token}`)
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const res = await api.get('/api/blogs')
	const contents = res.body.map(i => i)
	expect(contents).toHaveLength(firstRes.body.length + 1)
})

test('if !likes likes === 0', async () => {
	const firstRes = await api.get('/api/blogs')

	const noLikeAtAll = {
		title: 'Vanhaa putkeen!',
		author: 'Liisa',
		url: 'ficomnet',
	}
	const token = await loginAndGetToken()

	await api
		.post('/api/blogs')
		.set('Authorization', `Bearer ${token}`)
		.send(noLikeAtAll)
		.expect(201)
    .expect('Content-Type', /application\/json/)

	const res = await api.get('/api/blogs')
	const contents = res.body.map(all => all)
	expect(contents).toHaveLength(firstRes.body.length + 1)

	const checkLikes = (contents.map(like => like.likes))
	expect(checkLikes).toBeDefined()

})

test ('no title/url', async () => {
	const token = await loginAndGetToken()


	const titleUrlTest = {
		author: 'TITLE URL TEST',
		likes: 867
	}

	await api
	.post('/api/blogs')
	.set('Authorization', `Bearer ${token}`)
	.send(titleUrlTest)
	.expect(400)

	const titleTest = {
		author: 'TITLE TEST',
		url: 'www.com',
		likes: 867
	}

	await api
	.post('/api/blogs')
	.set('Authorization', `Bearer ${token}`)
	.send(titleTest)
	.expect(400)

	const urlTest = {
		title: 'Mr. Title',
		author: 'URL TEST',
		likes: 867
	}

	await api
	.post('/api/blogs')
	.set('Authorization', `Bearer ${token}`)
	.send(urlTest)
	.expect(400)
})

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await api.get('/api/blogs')
		const blogToDelete = blogsAtStart.body[0]
		const token = await loginAndGetToken()

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(204)

		const blogsAtEnd = await api.get('/api/blogs')

		expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1)

		const contents = blogsAtEnd.body.map(i => i.id)
		expect(contents).not.toContain(blogToDelete.id)
	})
})

describe('updating blog', () => {
	test('update likes + / -', async () => {
		const allBlogs = await api.get('/api/blogs')
		const blogToUpdate = allBlogs.body[0]
		console.log('aliku', blogToUpdate)

		const plusLikes = {
			likes: blogToUpdate.likes + 10
		}

		const updated = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(plusLikes)
			.expect(200)

		expect(updated.body.likes).toBe(blogToUpdate.likes + 10)

		const blog2ToUpdate = allBlogs.body[1]

		const minusLikes = {
			likes: blog2ToUpdate.likes - 3
		}

		const updated2 = await api
			.put(`/api/blogs/${blog2ToUpdate.id}`)
			.send(minusLikes)
			.expect(200)

		expect(updated2.body.likes).toBe(blog2ToUpdate.likes - 3)
	})
})

describe('when at least one user at db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash, name: 'roottis moro' })
		const user2 = new User({ username: 'repe', passwordHash, name: 'Reiska Repolainen'})

		await user.save()
		await user2.save()

	})

	test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      password: 'salainen',
      name: 'Matti Luukkainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

	test('creation fails if username is taken', async () => {
		console.log('1. Fetching users at start')
		const usersAtStart = await helper.usersInDb()
		console.log('2. Fetched users at start:', usersAtStart)

		const newUser = {
			username: 'repe',
			name: 'Pyrkyri',
			password: 'salainen'
		}

		console.log('3. Sending request to create user')
		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		console.log('4. Request completed, result:', result.body)

		expect(result.body.error).toContain('expected `username` to be unique')

		console.log('5. Fetching users at end')
		const usersAtEnd = await helper.usersInDb()
		console.log('6. Fetched users at end:', usersAtEnd)
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	}, 20000)

	test('password exists', async () => {
		const newUser = {
			username: 'repe',
			name: 'Pyrkyri',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		// Check if the error message is "empty password"
		expect(result.body.error).toBe('empty password')
	})

	test('password length < 3', async () => {
		const newUser = {
			username: 'repe',
			name: 'Pyrkyri',
			password: '12'
		}

		const result = await api
		.post('/api/users')
		.send(newUser)
		.expect(400)

	// Check if the error message is "empty password"
	expect(result.body.error).toBe('min password length is 3')
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
