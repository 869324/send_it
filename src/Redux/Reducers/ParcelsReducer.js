import { SET_PARCELS } from "../ActionTypes/ParcelActionTypes";

const parcelsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PARCELS:
      return action.parcels;
    default:
      return state;
  }
};

export default parcelsReducer;
