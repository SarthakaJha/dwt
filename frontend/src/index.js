import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./app/store";
import App from "./App";
import "./index.css";

import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      closeOnClick
      theme="colored"
    />
  </Provider>
);
