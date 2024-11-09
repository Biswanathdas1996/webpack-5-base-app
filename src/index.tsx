import React from "react";
import App from "./App";
import "./App.css";
import { HashRouter } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("app");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  );
} else {
  console.error("Failed to find the root element");
}
