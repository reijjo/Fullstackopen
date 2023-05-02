import { createSlice } from "@reduxjs/toolkit";
import anedcoteService from '../services/anecdotes'

//const getId = () => (100000 * Math.random()).toFixed(0);

//const asObject = (anecdote) => {
//  return {
//    content: anecdote,
//    id: getId(),
//    votes: 0,
//  };
//};

//const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnec(state, action) {
      const id = action.payload.id;
      const anecToChange = state.find((a) => a.id === id);
      const changedAnec = {
        ...anecToChange,
        votes: anecToChange.votes + 1,
      };

      return state.map((anec) => (anec.id !== id ? anec : changedAnec));
    },
    //addAnecdote(state, action) {
    //  const newAnecdote = action.payload
    //  state.push(newAnecdote);
    //},
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
});

export const { voteAnec, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anedcoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNew = content => {
  return async dispatch => {
    const newAnecdote = await anedcoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer;
