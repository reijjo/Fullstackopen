import { createSlice } from "@reduxjs/toolkit";
import anedcoteService from '../services/anecdotes'
import { setNotif } from "./notificationReducer";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    //voteAnec(state, action) {
    //  const id = action.payload.id;
    //  const anecToChange = state.find((a) => a.id === id);
    //  const changedAnec = {
    //    ...anecToChange,
    //    votes: anecToChange.votes + 1,
    //  };

    //  return state.map((anec) => (anec.id !== id ? anec : changedAnec));
    //},
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
});

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

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

export const voteAnec = (id) => {
  return async (dispatch, getState) => {
    console.log('TAA', id.id)
    const anecdotes = getState().anecdote
    const toVote = anecdotes.find((a) => a.id === id.id)
    const changedAnec = {
      ...toVote,
      votes: toVote.votes + 1
    }
    const updatedAnec = await anedcoteService.addVote(id.id, changedAnec)

    const updatedList = anecdotes.map(anec =>
      anec.id !== id.id ? anec : updatedAnec)
    dispatch(setAnecdotes(updatedList))
    dispatch(setNotif(`You voted for '${changedAnec.content}'`, 5))
  }
}

export default anecdoteSlice.reducer;
