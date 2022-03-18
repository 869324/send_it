import { SET_PARCELS } from "../ActionTypes/ParcelActionTypes";

export function setParcels(parcels) {
  return {
    type: SET_PARCELS,
    parcels: parcels,
  };
}
