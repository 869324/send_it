import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "../Reducers/UserReducer";
import statesReducer from "../Reducers/StatesReducer";
import parcelsReducer from "../Reducers/ParcelsReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  states: statesReducer,
  parcels: parcelsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
