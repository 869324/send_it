import { LOGIN, LOGOUT } from "../ActionTypes/UserActionTypes";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userReducer;
