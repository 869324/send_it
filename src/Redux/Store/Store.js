import { createStore, combineReducers } from "redux";
import userReducer from "../Reducers/UserReducer";
import statesReducer from "../Reducers/StatesReducer";
import parcelsReducer from "../Reducers/ParcelsReducer";

const store = createStore(
  combineReducers({
    user: userReducer,
    states: statesReducer,
    parcels: parcelsReducer,
  })
);

export default store;
