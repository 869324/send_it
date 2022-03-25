import axios from "axios";
import {
  SEND_MESSAGE,
  UPDATE_MESSAGE,
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

export function resetSendMessage() {
  return {
    type: SEND_MESSAGE.RESET,
  };
}
