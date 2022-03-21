import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import "./app/App.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <h2>Hi Welcome, This Application uses the Rinkeby Network</h2>
      <p style={{ backgroundColor: "red" }}>
        Ensure you have Metamask installed
      </p>
    </div>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
