import { LOGIN, LOGOUT } from "../ActionTypes/UserActionTypes";

export function login(user) {
  return {
    type: LOGIN,
    user: user,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
