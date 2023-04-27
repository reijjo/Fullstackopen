import { useDispatch } from 'react-redux'
import { addAnecdote } from "../reducers/anecdoteReducer";
import { showNotif } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const newAnec = (event) => {
    event.preventDefault()
    const content = event.target.anec.value
		const notificat = `You added '${content}'`;
    event.target.anec.value = ''
    dispatch(addAnecdote(content));
    dispatch(showNotif(notificat));
    setTimeout(() => {
      dispatch(showNotif(null));
    }, 5000);
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
