import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { MessageContextProvider } from "./MessageContext";
import { LoginContextProvider } from "./LoginContext";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <MessageContextProvider>
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
    </MessageContextProvider>
  </QueryClientProvider>
);
