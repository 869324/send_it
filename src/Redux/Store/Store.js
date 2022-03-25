import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import userReducer from "../Reducers/UserReducer";
import utilsReducer from "../Reducers/UtilsReducer";
import parcelsReducer from "../Reducers/ParcelsReducer";
import messageReducer from "../Reducers/MessageReducer";

/*const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  utils: utilsReducer,
  parcels: parcelsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };*/

const rootReducer = combineReducers({
  user: userReducer,
  utils: utilsReducer,
  parcels: parcelsReducer,
  message: messageReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
