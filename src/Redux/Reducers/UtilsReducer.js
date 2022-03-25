import {
  CHANGE_LOGIN_REDIRECT,
  GET_STATIONS,
  SET_TRACK_ID,
  CHANGE_PANEL,
} from "../ActionTypes/UtilsActionTypes";

const initialState = {
  activePanel: "getStarted",
  loginRedirect: "/",
  stations: [],
  trackId: "",
};

const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOGIN_REDIRECT: {
      return { ...state, loginRedirect: action.url };
    }

    case GET_STATIONS.SUCCESS: {
      return { ...state, stations: action.stations };
    }

    case SET_TRACK_ID: {
      return { ...state, trackId: action.id };
    }

    case CHANGE_PANEL: {
      return { ...state, activePanel: action.url };
    }

    default:
      return state;
  }
};

export default utilsReducer;
