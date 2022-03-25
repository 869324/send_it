import axios from "axios";

import { LOGIN, SIGNUP } from "../ActionTypes/UserActionTypes";

export const login = (user) => async (dispatch) => {
  dispatch({
    type: LOGIN.LOADING,
  });

  axios
    .post("http://localhost:8000/users/login", user)
    .then((response) => {
      if (response.data.status) {
        dispatch({
          type: LOGIN.SUCCESS,
          user: response.data.user,
        });
      } else {
        dispatch({
          type: LOGIN.FAIL,
          error: response.data.error,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: LOGIN.FAIL,
        error: "An error occured. Try again later",
      });
    });
};

export const signup = (user) => async (dispatch) => {
  dispatch({
    type: SIGNUP.LOADING,
  });

  axios
    .post("http://localhost:8000/users/addUser", user)
    .then((response) => {
      if (response.data.status) {
        dispatch({
          type: SIGNUP.SUCCESS,
        });
      } else {
        dispatch({
          type: SIGNUP.FAIL,
          error: response.data.error,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SIGNUP.FAIL,
        error: "An error occured. Try again later",
      });
    });
};

export function resetSignup() {
  return {
    type: SIGNUP.RESET,
  };
}

export function resetLogin() {
  return {
    type: LOGIN.RESET,
  };
}

export function logout() {
  return {
    type: LOGIN.LOGOUT,
  };
}
