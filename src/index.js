import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "rsuite/dist/styles/rsuite-default.css";
import App from "./App";
import Development from "./pages/Development";

const isService = false;

ReactDOM.render(
  <React.StrictMode>
    {!isService && <App />}
    {isService && <Development />}
  </React.StrictMode>,
  document.getElementById("root")
);
