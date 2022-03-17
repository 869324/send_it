import { createStore, combineReducers } from "redux";
import userReducer from "../Reducers/UserReducer";
import statesReducer from "../Reducers/StatesReducer";

const store = createStore(
  combineReducers({
    user: userReducer,
    states: statesReducer,
  })
);

export default store;
