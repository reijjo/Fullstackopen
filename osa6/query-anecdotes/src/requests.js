import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const voteAnecdote = (voted) =>
  axios.put(`${baseUrl}/${voted.id}`, voted).then((res) => res.data);

export const addAnecdote = (object) =>
  axios.post(baseUrl, object).then((res) => res.data);
