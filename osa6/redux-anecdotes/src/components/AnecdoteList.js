import { useDispatch, useSelector } from 'react-redux'
import { voteAnec } from "../reducers/anecdoteReducer";
import { showNotif } from "../reducers/notificationReducer";

const AnecdoteList = ({ anecdote }) => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    console.log("STATE", state);
    if (state.filter === "ALL") {
      return state.anecdote;
    }
    return state.anecdote.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  const mostVotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);

  return (
    <>
      {mostVotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(voteAnec({ id: anecdote.id }));
                const notifMessage = `You voted for '${anecdote.content}'`;
                dispatch(showNotif(notifMessage));
                setTimeout(() => {
                  dispatch(showNotif(null));
                }, 5000);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList
