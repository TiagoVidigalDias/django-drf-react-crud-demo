import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";

const App = () => (
  <Main />
);

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;