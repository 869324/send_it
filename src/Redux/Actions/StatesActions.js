import {
  CHANGE_PANEL,
  CHANGE_LOGIN_REDIRECT,
  SET_STATIONS,
  SET_TRACK_ID,
} from "../ActionTypes/StatesActionTypes";

export function changePanel(panel) {
  return {
    type: CHANGE_PANEL,
    panel: panel,
  };
}

export function changeLoginRedirect(url) {
  return {
    type: CHANGE_LOGIN_REDIRECT,
    url: url,
  };
}

export function setStations(stations) {
  return {
    type: SET_STATIONS,
    stations: stations,
  };
}

export function setTrackId(id) {
  return {
    type: SET_TRACK_ID,
    id: id,
  };
}
