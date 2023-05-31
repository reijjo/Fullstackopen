// import React from "react";
import ReactDOM from "react-dom/client";
// import PropTypes from "prop-types";
import App from "./App";

// interface WelcomeProps {
//   name: string;
// }

// const Welcome = (props: WelcomeProps): JSX.Element => {
//   return <h1>Hello, {props.name}</h1>;
// };

// Welcome.propTypes = {
//   name: PropTypes.string,
// };

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <Welcome name="Sarah" />
  <App />
);
