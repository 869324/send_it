import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { GrClose } from "react-icons/gr";

import styles from "./AdminEditParcels.module.css";

import {
  getParcels,
  resetUpdateParcels,
  updateParcel,
} from "../../Redux/Actions/ParcelActions";

function AdminEditParcel(props) {
  const dispatch = useDispatch();

  const { stations } = useSelector((state) => state.utils);
  const user = useSelector((state) => state.user);
  const updateParcelState = useSelector((state) => state.parcels.update);

  const [isSent, setSent] = useState(props.parcel.isSent);
  const [isDelivered, setDelivered] = useState(props.parcel.isDelivered);
  const [lng, setLng] = useState("");
  const [lat, setLat] = useState("");

  useEffect(() => {
    const { error, loading, status } = updateParcelState;
    if (status) {
      swal({
        icon: "success",
        text: "Order has been updated",
      });
      dispatch(getParcels(props.parcelsData));
      props.setShowEditor(false);
    } else if (error != "" && !loading) {
      swal({
        icon: "error",
        text: "Order could not update",
      });
    }
  }, [updateParcelState]);

  useEffect(() => {
    return () => {
      dispatch(resetUpdateParcels());
    };
  }, []);

  function submit(event) {
    event.preventDefault();

    if (isDelivered == "true" && isSent == "false") {
      swal({
        icon: "warning",
        text: "A parcel can't be delivered without being sent",
      });
    } else {
      dispatch(
        updateParcel({
          id: props.parcel.id,
          isSent: isSent,
          isDelivered: isDelivered,
          current_location: `${lng} ${lat}`,
        })
      );
    }
  }

  return (
    <div className={styles.bg}>
      <div className={styles.editor}>
        <GrClose
          className={styles.close}
          size={21}
          onClick={() => props.setShowEditor(false)}
        />
        <h2 className={styles.heading}>Update parcel info</h2>

        <form className={styles.form} onSubmit={submit}>
          <div className={styles.inputDiv}>
            <label className={styles.category}>Parcel is sent</label>
            <div className={styles.option}>
              <input
                className={styles.radio}
                type="radio"
                name="isSent"
                value="true"
                checked={isSent == "true"}
                onChange={(e) => setSent(e.target.value)}
              ></input>
              <label className={styles.radioLabel}>Yes</label>
            </div>

            <div className={styles.option}>
              <input
                className={styles.radio}
                type="radio"
                name="isSent"
                value="false"
                checked={isSent == "false"}
                onChange={(e) => setSent(e.target.value)}
              ></input>
              <label className={styles.radioLabel}>No</label>
            </div>
          </div>

          <div className={styles.inputDiv}>
            <label className={styles.category}>Parcel is delivered</label>
            <div className={styles.option}>
              <input
                className={styles.radio}
                type="radio"
                name="isDelivered"
                value="true"
                checked={isDelivered == "true"}
                onChange={(e) => setDelivered(e.target.value)}
              ></input>
              <label className={styles.radioLabel}>Yes</label>
            </div>

            <div className={styles.option}>
              <input
                className={styles.radio}
                type="radio"
                name="isDelivered"
                value="false"
                checked={isDelivered == "false"}
                onChange={(e) => setDelivered(e.target.value)}
              ></input>
              <label className={styles.radioLabel}>No</label>
            </div>
          </div>

          <div
            className={styles.locDiv}
            style={{ visibility: isSent == "true" ? "visible" : "hidden" }}
          >
            <label className={styles.locLabel}>Current Location</label>
            <input
              className={styles.locInput}
              placeholder="Longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
            <input
              className={styles.locInput}
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </div>

          <button className={styles.submit} type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminEditParcel;
