import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAnecdotes, voteAnecdote } from "./requests";
import { useNotificationDispatch } from "./NotificationContext";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const voteMutation = useMutation(voteAnecdote, {
    onSuccess: (voted) => {
      const anecdotes = queryClient.getQueriesData("anecdotes");
      const votedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id === voted.id ? { ...anecdote, ...voted } : anecdote
      );
      queryClient.invalidateQueries("anecdotes", votedAnecdotes);
      notificationDispatch({
        type: "ADD_NOTIFICATION",
        payload: `anecdote '${voted.content}' voted`,
      });
      setTimeout(() => {
        notificationDispatch({
          type: "HIDE_NOTIFICATION",
          payload: null,
        });
      }, 5000);
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    console.log("vote", anecdote);
  };

  const result = useQuery("anecdotes", getAnecdotes, {
    retry: 1,
  });
  console.log("RESULT", result);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.error) {
    return <div>anecdote service not availabe due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    // <NotificationContextProvider>
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
    // </NotificationContextProvider>
  );
};

export default App;
