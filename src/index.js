import React from "react";
import ReactDOM from "react-dom";
import GlobalWrapper from "./UI/GlobalWrapper";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <GlobalWrapper>
      <App />
    </GlobalWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
