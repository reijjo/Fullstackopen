import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Loginform from './components/Loginform'
import Newblog from './components/Newblog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

	useEffect(() => {
		const loggedIn = window.localStorage.getItem('loggedIn')
		if (loggedIn) {
			const user = JSON.parse(loggedIn)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const blogFormRef = useRef()

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			})

			window.localStorage.setItem(
				'loggedIn', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		}
		catch (exception) {
			// console.log('EXX', exception.response.data.error)
			setErrorMessage({
				message: exception.response.data.error,
				style: { color: 'red' }
			})
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
		console.log('logging in with', username, password)
	}

	const logout =  () => {
		window.localStorage.removeItem('loggedIn')
		// window.localStorage.clear()
		window.location.reload()
	}

	const handleAddBlog = async (blogObject) => {
		// event.preventDefault()
		try {
			const blog = await blogService.addBlog(
				// title, author, url
				blogObject,
			)
			console.log('BLOG', blog)
			setBlogs(blogs.concat(blog.savedBlog))
			setErrorMessage({
				message: blog.message,
				style: { color: 'green' }
			})
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
			blogFormRef.current.toggleVisibility()
		}
		catch (exception) {
			console.error('error when adding', exception)
			setErrorMessage({
				message: 'Something strange happened.',
				style: { color: 'red' }
			})
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleDeleteBlog = async (blogId) => {
		console.log('alku', blogId)
		try {
			console.log('BLOGID', blogId)
			if (window.confirm(`Remove blog ${blogId.title} by ${blogId.author}`)) {
				await blogService.deleteBlog(blogId.id)
				setBlogs(blogs.filter((blog) => blog.id !== blogId.id))
			}
		}
		catch (error) {
			console.error('Error deleting blog', error)
			setErrorMessage({
				message: error.response.data.error || 'Something went wrong while deleting the blog',
				style: { color: 'red' }
			})
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const addLike = async (blog) => {
		try {
			const response = await blogService.updateBlog(blog.id, blog)
			setBlogs(blogs.map((b) => (b.id === blog.id ? { ...blog, likes: response.likes } : b)))
		} catch (error) {
			console.error('Add Like fukked up')
		}
	}


	return (
    <div>
			{!user &&
				<Loginform handleLogin={handleLogin}
				username={username} setUsername={setUsername} password={password} setPassword={setPassword}
				errorMessage={errorMessage}
			/>}
			{user &&
				<>
					<h2>blogs</h2>
					<Notification message={errorMessage} />
					<p>{user.name} logged in <button onClick={logout}>log out</button></p>
					<Togglable ref={blogFormRef}
						buttonLabel='create new blog'
						cancelLabel='cancel'
					>
						<Newblog
							createBlog={handleAddBlog}
						/>
					</Togglable>
					{blogs
						.slice()
						.sort((a, b) => b.likes - a.likes)
						.map(blog =>
							<Blog key={blog.id} blog={blog}
								handleDeleteBlog={() => handleDeleteBlog(blog)}
								addLike={() => addLike(blog)}
								user={user}
						/>
					)}
				</>
			}

    </div>
  )
}

export default App