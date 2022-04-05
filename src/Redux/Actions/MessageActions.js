import axios from "axios";
import {
  SEND_MESSAGE,
  UPDATE_MESSAGE,
  GET_MESSAGES,
  GET_A_MESSAGES,
  DELETE_MESSAGE,
} from "../ActionTypes/MessageActionTypes";

export const sendMessage = (message) => async (dispatch) => {
  dispatch({
    type: SEND_MESSAGE.LOADING,
  });

  axios
    .post("http://localhost:8000/messages/addMessage", message)
    .then((response) => {
      if (response.data.status) {
        dispatch({
          type: SEND_MESSAGE.SUCCESS,
        });
      } else {
        dispatch({
          type: SEND_MESSAGE.FAIL,
          error: "Message could not be sent, try again later",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: SEND_MESSAGE.FAIL,
        error: "Message could not be sent, try again later",
      });
    });
};

export const getMessages = (message) => async (dispatch) => {
  dispatch({
    type: GET_MESSAGES.LOADING,
  });

  axios
    .post("http://localhost:8000/messages/getMessages", message)
    .then((response) => {
      if (response.data.status) {
        dispatch({
          type: GET_MESSAGES.SUCCESS,
          messages: response.data.messages,
        });
      } else {
        dispatch({
          type: GET_MESSAGES.FAIL,
          error: "Message could not get messages, try again later",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_MESSAGES.FAIL,
        error: "Message could not get messages, try again later",
      });
    });
};

export const updateMessage = (message) => async (dispatch) => {
  dispatch({
    type: UPDATE_MESSAGE.LOADING,
  });

  axios
    .put("http://localhost:8000/messages/updateMessage", message)
    .then((response) => {
      if (response.data.status) {
        dispatch({
          type: UPDATE_MESSAGE.SUCCESS,
        });
      } else {
        dispatch({
          type: UPDATE_MESSAGE.FAIL,
          error: "An error occured",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_MESSAGE.FAIL,
        error: "An error occured",
      });
    });
};

export function resetSendMessage() {
  return {
    type: SEND_MESSAGE.RESET,
  };
}

export function resetGetMessages() {
  return {
    type: GET_MESSAGES.RESET,
  };
}

export function resetUpdateMessage() {
  return {
    type: UPDATE_MESSAGE.RESET,
  };
}
