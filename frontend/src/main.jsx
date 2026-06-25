import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import { store } from "./redux/store";
import App from "./App";
import "./index.css";

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL?.replace(/\/api$/, "") ||
  "http://localhost:5000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
