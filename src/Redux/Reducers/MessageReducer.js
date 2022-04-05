import { combineReducers } from "redux";

import {
  SEND_MESSAGE,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
  GET_A_MESSAGES,
  GET_MESSAGES,
} from "../ActionTypes/MessageActionTypes";

const sendState = {
  loading: false,
  error: "",
  status: false,
};

const updateState = {
  loading: false,
  error: "",
  status: false,
};

const getMessagesState = {
  loading: false,
  error: "",
  status: false,
  messages: [],
};

const sendReducer = (state = sendState, action) => {
  switch (action.type) {
    case SEND_MESSAGE.SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        status: true,
      };

    case SEND_MESSAGE.FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        status: false,
      };

    case SEND_MESSAGE.LOADING:
      return {
        ...state,
        loading: true,
        error: "",
        status: false,
      };

    case SEND_MESSAGE.RESET:
      return sendState;

    default:
      return state;
  }
};

const updateReducer = (state = updateState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGE.SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        status: true,
      };

    case UPDATE_MESSAGE.FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        status: false,
      };

    case UPDATE_MESSAGE.LOADING:
      return {
        ...state,
        loading: true,
        error: "",
        status: false,
      };

    case UPDATE_MESSAGE.RESET:
      return sendState;

    default:
      return state;
  }
};

const getMessagesReducer = (state = getMessagesState, action) => {
  switch (action.type) {
    case GET_MESSAGES.SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        status: true,
        messages: action.messages,
      };

    case GET_MESSAGES.FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        status: false,
      };

    case GET_MESSAGES.LOADING:
      return {
        ...state,
        loading: true,
        error: "",
        status: false,
      };

    case GET_MESSAGES.RESET:
      return getMessagesState;

    default:
      return state;
  }
};

const messageReducer = combineReducers({
  send: sendReducer,
  update: updateReducer,
  getMessages: getMessagesReducer,
});

export default messageReducer;
