// eslint-disable-next-line simple-import-sort/imports
import "@ya.praktikum/react-developer-burger-ui-components";
import { configureStore } from "@reduxjs/toolkit";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { rootReducer } from "./services/reducers";

import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";

import "./styles/index.scss";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
