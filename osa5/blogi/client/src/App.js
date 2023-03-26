import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Loginform from './components/Loginform'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState('')

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
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			})

			window.localStorage.setItem(
				'loggedIn', JSON.stringify(user)
			)
			setUser(user)
			setUsername('')
			setPassword('')
		}
		catch (exception) {

		}
		console.log('logging in with', username, password)
	}

	const logout =  () => {
		window.localStorage.removeItem('loggedIn')
		// window.localStorage.clear()
		window.location.reload()
	}

	console.log('USER', user)

  return (
    <div>
			{!user &&
				<Loginform handleLogin={handleLogin}
				username={username} setUsername={setUsername} password={password} setPassword={setPassword}
			/>}
			{user &&
				<>
				  <h2>blogs</h2>
					<p>{user.name} logged in <button onClick={logout}>log out</button></p>
					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog} />
					)}
				</>
			}

    </div>
  )
}

export default App