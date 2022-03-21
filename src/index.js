import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ethers } from "ethers";
import App from "./app/App";
import "./app/App.css";
import reportWebVitals from "./reportWebVitals";
let provider;
try {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} catch (e) {
  console.log(e);
}
ReactDOM.render(
  <React.StrictMode>
    {typeof window.ethereum !== "undefined" ? (
      <App provider={provider} />
    ) : (
      <div className="App">
        <p style={{ backgroundColor: "red" }}>
          You need Metamask Installed to use the application
        </p>
      </div>
    )}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
