import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    showNotif(state, action) {
      return action.payload;
    },
  },
});

export const { showNotif } = notificationSlice.actions;


let timer = null

export const setNotif = (content, time) => {
  return async dispatch => {
    clearTimeout(timer)
    dispatch(showNotif(content))
    timer = setTimeout(() => {
      dispatch(showNotif(null))
    }, 1000 * time)
  }
}

export default notificationSlice.reducer;
