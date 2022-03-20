import {
  CHANGE_PANEL,
  CHANGE_LOGIN_REDIRECT,
  SET_STATIONS,
  SET_TRACK_ID,
} from "../ActionTypes/StatesActionTypes";

const initialState = {
  panel: "getStarted",
  loginRedirect: "/",
  stations: [],
  trackId: "",
};

const statesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PANEL: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.panel = action.panel;
      return newState;
    }

    case CHANGE_LOGIN_REDIRECT: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loginRedirect = action.url;
      return newState;
    }

    case SET_STATIONS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.stations = action.stations;
      return newState;
    }

    case SET_TRACK_ID: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.trackId = action.id;
      return newState;
    }

    default:
      return state;
  }
};

export default statesReducer;
