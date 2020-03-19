import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

// Pages
import App from "./App";
// Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// Store
import configureStore from "./redux/Store/Store";

// Styling
import "./index.css";

const { persistor, store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();
