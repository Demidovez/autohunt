import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Development from "./Development";
import "semantic-ui-css/semantic.min.css";

const isService = false;

ReactDOM.render(
  <React.StrictMode>
    {!isService && <App />}
    {isService && <Development />}
  </React.StrictMode>,
  document.getElementById("root")
);
