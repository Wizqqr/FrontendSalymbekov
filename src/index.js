import React from "react";
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import {Provider} from 'react-redux'
import { ThemeProvider } from "@mui/material";
import store from './redux/store.js'
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <CssBaseline />
      <BrowserRouter>
      <Provider store={store}>
        <App></App>
      </Provider>
      </BrowserRouter>
    </>
);