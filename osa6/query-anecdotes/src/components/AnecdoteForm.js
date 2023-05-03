import { useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotificationContext";
import { addAnecdote } from "../requests";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      console.log("ANEX", anecdotes);
      queryClient.invalidateQueries("anecdotes", anecdotes.concat(newAnecdote));
    },
    onError: (error) => {
      notificationDispatch({
        type: "ADD_NOTIFICATION",
        payload: `${error.response.data.error}`,
      });
      setTimeout(() => {
        notificationDispatch({
          type: "HIDE_NOTIFICATION",
          payload: null,
        });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    console.log("HUHUUU", { content, votes: 0 });
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
    notificationDispatch({
      type: "ADD_NOTIFICATION",
      payload: `Anecdote: '${content}' added!`,
    });
    setTimeout(() => {
      notificationDispatch({
        type: "HIDE_NOTIFICATION",
        payload: null,
      });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
