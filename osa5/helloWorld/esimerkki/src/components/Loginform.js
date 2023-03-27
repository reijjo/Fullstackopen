import { useState } from 'react'
// const Loginform = ({
// 	handleSubmit, handleUsernameChange,handlePasswordChange,
// 	username, password,
// }) => {
const Loginform = ({ login }) => {
	const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

	const handleLogin = (event) => {
		event.preventDefault()
		login(username, password)
		setUsername('')
		setPassword('')
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type='text'
						value={username}
						name='Username'
						onChange={(event) => setUsername(event.target.value)}
					/>
				</div>
				<div>
					password
					<input
						type='password'
						value={password}
						name='Password'
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	)
}

export default Loginform