import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <div>
    <Provider store = {store}>
      <Router>
        <App />
      </Router>
    </Provider>
    </div>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
