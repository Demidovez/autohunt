import React from "react";
import ReactDOM from "react-dom";
import "rsuite/dist/styles/rsuite-default.css";
import App from "./App";
import ServicePage from "./pages/ServicePage/servicepage";
import "./index.css";

const isService = false;

ReactDOM.render(
  <React.StrictMode>
    {!isService && <App />}
    {isService && <ServicePage />}
  </React.StrictMode>,
  document.getElementById("root")
);
