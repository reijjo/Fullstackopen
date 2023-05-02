import { useDispatch } from 'react-redux'
import { createNew } from "../reducers/anecdoteReducer";
import { showNotif } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const newAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anec.value
		const notificat = `You added '${content}'`;
    event.target.anec.value = ''
		//const makeNew = await anecdoteService.createNew(content)
    //dispatch(addAnecdote(makeNew));
		dispatch(createNew(content))
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
