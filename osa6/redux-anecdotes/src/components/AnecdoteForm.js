import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const newAnec = (event) => {
    event.preventDefault()
    const content = event.target.anec.value
    event.target.anec.value = ''
    dispatch(newAnecdote(content))
  }

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={newAnec}>
				<div>
					<input name='anec' />
				</div>
				<button type='submit'>create</button>
			</form>
		</>
	)
}

export default AnecdoteForm
