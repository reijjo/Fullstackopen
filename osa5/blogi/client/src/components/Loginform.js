import Notication from './Notification'

const Loginform = ({ handleLogin, username, setUsername, password, setPassword, errorMessage, }) => {

	// errorMessage = null
	return (
		<>
		<h2>log in to application</h2>
		<Notication message={errorMessage} />
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type='text'
					value={username}
					name='Username'
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type='password'
					value={password}
					name='Password'
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type='submit'>login</button>
		</form>
		</>
	)
}

export default Loginform