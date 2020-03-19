import { createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "../Reducers/rootReducer";

const config = {
  key: "user",
  storage: storage,
  blacklist: ["counter"]
};

let persistedReducer = persistCombineReducers(config, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  let persistor = persistStore(store);
  return {
    store,
    persistor
  };
};
