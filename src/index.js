import React from "react";
import ReactDOM from "react-dom";
import "rsuite/dist/styles/rsuite-default.css";
import App from "./App";
import Development from "./pages/Development";
import "./index.css";

const isService = false;

ReactDOM.render(
  <React.StrictMode>
    {!isService && <App />}
    {isService && <Development />}
  </React.StrictMode>,
  document.getElementById("root")
);
