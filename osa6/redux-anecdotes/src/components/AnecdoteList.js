import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ anecdote }) => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(state => state)

  const mostVotes = anecdotes.slice().sort((a, b) => b.votes - a.votes)

	return (
	<>
		{mostVotes.map(anecdote =>
			<div key={anecdote.id}>
				<div>
					{anecdote.content}
				</div>
				<div>
					has {anecdote.votes}
					<button
						onClick={() =>
							dispatch(addVote(anecdote.id))}
					>
						vote
					</button>
				</div>
			</div>
		)}
	</>
	)
}

export default AnecdoteList
