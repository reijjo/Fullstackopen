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

export default notificationSlice.reducer;
