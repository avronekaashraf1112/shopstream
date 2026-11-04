import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/custom.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* connect the redux store to the react app */}
      <App />
    </Provider>
  </React.StrictMode>,
);
