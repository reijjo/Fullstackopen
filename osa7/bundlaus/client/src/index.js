import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "core-js/stable/index";
import "regenerator-runtime/runtime";
import "./index.css";

console.log("BACKEND_URL", BACKEND_URL);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
