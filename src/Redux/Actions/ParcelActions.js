import axios from "axios";

import {
  ADD_PARCEL,
  GET_PARCELS,
  UPDATE_PARCEL,
  DELETE_PARCEL,
} from "../ActionTypes/ParcelActionTypes";

export const getParcels = (parcelsData) => async (dispatch) => {
  dispatch({
    type: GET_PARCELS.LOADING,
  });

  axios
    .post("http://localhost:8000/parcels/getParcels", parcelsData)
    .then((response) => {
      if (response.data.status) {
        if (response.data.parcels.length == 0 && parcelsData.page > 1) {
          dispatch({
            type: GET_PARCELS.FAIL,
            error: "There is no more data",
          });
        } else {
          console.log(response.data.parcels);
          dispatch({
            type: GET_PARCELS.SUCCESS,
            parcels: response.data.parcels,
          });
        }
      } else {
        dispatch({
          type: GET_PARCELS.FAIL,
          error: "An error occured while getting your data. Try again later",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_PARCELS.FAIL,
        error: "An error occured while getting your data. Try again later",
      });
    });
};

export const addParcel = (parcel) => async (dispatch) => {
  dispatch({
    type: ADD_PARCEL.LOADING,
  });

  axios
    .post("http://localhost:8000/parcels/addParcel", parcel)
    .then((response) => {
      if (response.data.status) {
        dispatch({
          type: ADD_PARCEL.SUCCESS,
        });
      } else {
        dispatch({
          type: ADD_PARCEL.FAIL,
          error: "Order could not be submitted, try again later",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_PARCEL.FAIL,
        error: "Order could not be submitted, try again later",
      });
    });
};

export const updateParcel = (parcel) => async (dispatch) => {
  dispatch({
    type: UPDATE_PARCEL.LOADING,
  });

  axios
    .put("http://localhost:8000/parcels/updateParcel", parcel)
    .then((response) => {
      if (response.data.status) {
        dispatch({
          type: UPDATE_PARCEL.SUCCESS,
        });
      } else {
        dispatch({
          type: UPDATE_PARCEL.FAIL,
          error: "Order could not update, try again later",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_PARCEL.FAIL,
        error: "Order could not update, try again later",
      });
    });
};

export const deleteParcel = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_PARCEL.LOADING,
  });

  axios
    .delete(`http://localhost:8000/parcels/deleteParcel/${id}`)
    .then((response) => {
      if (response.data.status) {
        dispatch({
          type: DELETE_PARCEL.SUCCESS,
        });
      } else {
        dispatch({
          type: DELETE_PARCEL.FAIL,
          error: "Order could not be canceled, try again later",
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_PARCEL.FAIL,
        error: "Order could not be canceled, try again later",
      });
    });
};

export function resetGetParcels() {
  return {
    type: GET_PARCELS.RESET,
  };
}

export function resetAddParcels() {
  return {
    type: ADD_PARCEL.RESET,
  };
}

export function resetUpdateParcels() {
  return {
    type: UPDATE_PARCEL.RESET,
  };
}

export function resetDeleteParcels() {
  return {
    type: DELETE_PARCEL.RESET,
  };
}
