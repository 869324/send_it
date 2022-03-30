import { combineReducers } from "redux";
import {
  ADD_PARCEL,
  GET_PARCELS,
  UPDATE_PARCEL,
  DELETE_PARCEL,
  GET_A_PARCEL,
} from "../ActionTypes/ParcelActionTypes";

const getState = {
  parcels: [],
  loading: false,
  error: "",
  status: false,
};

const addState = {
  loading: false,
  error: "",
  status: false,
};

const updateState = {
  loading: false,
  error: "",
  status: false,
};

const deleteState = {
  loading: false,
  error: "",
  status: false,
};

const getParcelState = {
  loading: false,
  error: "",
  status: false,
  parcel: {},
};

const addReducer = (state = addState, action) => {
  switch (action.type) {
    case ADD_PARCEL.SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        status: true,
      };

    case ADD_PARCEL.FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        status: false,
      };

    case ADD_PARCEL.LOADING:
      return {
        ...state,
        loading: true,
        error: "",
        status: false,
      };

    case ADD_PARCEL.RESET:
      return addState;

    default:
      return state;
  }
};

const getReducer = (state = getState, action) => {
  switch (action.type) {
    case GET_PARCELS.SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        status: true,
        parcels: action.parcels,
      };

    case GET_PARCELS.FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        status: false,
      };

    case GET_PARCELS.LOADING:
      return {
        ...state,
        loading: true,
        error: "",
        status: false,
      };

    case GET_PARCELS.RESET:
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

const updateReducer = (state = updateState, action) => {
  switch (action.type) {
    case UPDATE_PARCEL.SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        status: true,
      };

    case UPDATE_PARCEL.FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        status: false,
      };

    case UPDATE_PARCEL.LOADING:
      return {
        ...state,
        loading: true,
        error: "",
        status: false,
      };

    case UPDATE_PARCEL.RESET:
      return updateState;

    default:
      return state;
  }
};

const deleteReducer = (state = deleteState, action) => {
  switch (action.type) {
    case DELETE_PARCEL.SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        status: true,
      };

    case DELETE_PARCEL.FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        status: false,
      };

    case DELETE_PARCEL.LOADING:
      return {
        ...state,
        loading: true,
        error: "",
        status: false,
      };

    case DELETE_PARCEL.RESET:
      return deleteState;

    default:
      return state;
  }
};

const getParcelReducer = (state = getParcelState, action) => {
  switch (action.type) {
    case GET_A_PARCEL.SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        status: true,
        parcel: action.parcel,
      };

    case GET_A_PARCEL.FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        status: false,
      };

    case GET_A_PARCEL.LOADING:
      return {
        ...state,
        loading: true,
        error: "",
        status: false,
      };

    case GET_A_PARCEL.RESET:
      return getParcelState;

    default:
      return state;
  }
};

const parcelsReducer = combineReducers({
  add: addReducer,
  get: getReducer,
  update: updateReducer,
  delete: deleteReducer,
  getParcel: getParcelReducer,
});

export default parcelsReducer;
