import { combineReducers } from "redux";
import { LOGIN, SIGNUP } from "../ActionTypes/UserActionTypes";
const initialState = {
  loginError: "",
  user: {},
  loading: false,
  signupStatus: false,
  signupError: "",
};
const loginState = {
  loginError: "",
  user: {},
  loading: false,
  signupStatus: false,
  signupError: "",
};

const signupState = {
  loginError: "",
  user: {},
  loading: false,
  signupStatus: false,
  signupError: "",
};

const loginReducer = (state = loginState, action) => {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
        loginError: "",
      };

    case LOGIN.FAIL:
      return {
        ...state,
        loading: false,
        user: {},
        loginError: action.error,
      };

    case LOGIN.LOADING:
      return {
        ...state,
        loading: true,
        user: {},
        loginError: "",
      };

    case LOGIN.LOGOUT:
      return {
        ...state,
        loading: false,
        user: {},
        loginError: "",
      };

    case LOGIN.RESET:
      return {
        ...state,
        loading: false,
        loginError: "",
      };

    case SIGNUP.SUCCESS:
      return {
        ...state,
        loading: false,
        signupStatus: true,
        signupError: "",
      };

    case SIGNUP.FAIL:
      return {
        ...state,
        loading: false,
        signupStatus: false,
        signupError: action.error,
      };

    case SIGNUP.LOADING:
      return {
        ...state,
        loading: true,
        signupStatus: false,
        signupError: "",
      };

    case SIGNUP.RESET:
      return {
        ...state,
        loading: false,
        signupStatus: false,
        signupError: "",
      };

    default:
      return state;
  }
};

export default userReducer;
