import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./reducers/messageReducer";
import blogReducer from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    message: messageReducer,
    blog: blogReducer,
  },
});

export default store;
