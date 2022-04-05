import { combineReducers } from "redux";
import { LOGIN, SIGNUP, UPDATE_USER } from "../ActionTypes/UserActionTypes";

const loginState = {
  error: "",
  user: {},
  loading: false,
  status: false,
};

const signupState = {
  error: "",
  loading: false,
  status: false,
};

const updateState = {
  error: "",
  loading: false,
  status: false,
};

const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case LOGIN.SUCCESS:
      return {
        ...state,
        user: action.user,
        status: true,
        loading: false,
        error: "",
      };

    case LOGIN.LOADING:
      return {
        ...state,
        user: {},
        status: false,
        loading: true,
        error: "",
      };

    case LOGIN.FAIL:
      return {
        ...state,
        user: {},
        status: false,
        loading: false,
        error: action.error,
      };

    case LOGIN.LOGOUT:
      return {
        user: {},
        status: false,
        loading: false,
        error: "",
      };

    case LOGIN.RESET:
      return {
        ...state,
        status: false,
        loading: false,
        error: "",
      };

    default:
      return state;
  }
};

const signupReducer = (state = signupState, action) => {
  switch (action.type) {
    case SIGNUP.SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        error: "",
      };

    case SIGNUP.FAIL:
      return {
        ...state,
        loading: false,
        status: false,
        error: action.error,
      };

    case SIGNUP.LOADING:
      return {
        ...state,
        loading: true,
        status: false,
        error: "",
      };

    case SIGNUP.RESET:
      return {
        ...state,
        loading: false,
        status: false,
        error: "",
      };

    default:
      return state;
  }
};

const updateReducer = (state = updateState, action) => {
  switch (action.type) {
    case UPDATE_USER.SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        error: "",
      };

    case UPDATE_USER.FAIL:
      return {
        ...state,
        loading: false,
        status: false,
        error: action.error,
      };

    case UPDATE_USER.LOADING:
      return {
        ...state,
        loading: true,
        status: false,
        error: "",
      };

    case UPDATE_USER.RESET:
      return {
        ...state,
        loading: false,
        error: "",
        status: false,
      };

    default:
      return state;
  }
};

const userReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  update: updateReducer,
});

export default userReducer;
