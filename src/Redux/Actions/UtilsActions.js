import axios from "axios";

import {
  CHANGE_LOGIN_REDIRECT,
  SET_TRACK_ID,
  CHANGE_PANEL,
  GET_STATIONS,
} from "../ActionTypes/UtilsActionTypes";

export function changeLoginRedirect(url) {
  return {
    type: CHANGE_LOGIN_REDIRECT,
    url: url,
  };
}

export const getStations = () => async (dispatch) => {
  axios.get("http://localhost:8000/parcels/getStations").then((res) => {
    if (res.data.status) {
      dispatch({
        type: GET_STATIONS.SUCCESS,
        stations: res.data.stations,
      });
    }
  });
};

export function setTrackId(id) {
  return {
    type: SET_TRACK_ID,
    id: id,
  };
}

export function changePanel(url) {
  return {
    type: CHANGE_PANEL,
    url: url,
  };
}
