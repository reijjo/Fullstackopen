import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import App from "./App";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer,
// });

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// store.subscribe(() => console.log(store.getState()));
// store.dispatch(filterChange("IMPORTANT"));
// store.dispatch(
//   createNote("combineReducers forms one reducer from many simple reducers")
// );