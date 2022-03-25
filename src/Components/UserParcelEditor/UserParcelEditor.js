import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { GrClose } from "react-icons/gr";

import styles from "./UserParcelEditor.module.css";
import {
  getParcels,
  resetUpdateParcels,
  updateParcel,
} from "../../Redux/Actions/ParcelActions";

function UserParcelEditor(props) {
  const dispatch = useDispatch();

  const { stations } = useSelector((state) => state.utils);
  const user = useSelector((state) => state.user);
  const updateParcelState = useSelector((state) => state.parcels.update);

  const [parcelData, setParcelData] = useState({
    id: props.parcel.id,
    description: props.parcel.description,
    receiver_number: props.parcel.receiver_number,
    start_location: props.parcel.start_location,
    end_location: props.parcel.end_location,
  });

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

  function handleChange(e) {
    setParcelData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const options = stations.map((station) => {
    return <option value={station.id}>{station.name}</option>;
  });

  function submit(event) {
    event.preventDefault();
    dispatch(updateParcel(parcelData));
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
            <label className={styles.category}>Description</label>
            <input
              className={styles.input}
              name="description"
              value={parcelData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputDiv}>
            <label className={styles.category}>Receiver Phone</label>
            <input
              className={styles.input}
              type="number"
              name="receiver_number"
              value={parcelData.receiver_number}
              onChange={handleChange}
              placeholder="Receiver's Phone"
              required
            />
          </div>

          <div className={styles.locDiv}>
            <label className={styles.locLabel}>Start Location</label>
            <select
              className={styles.select}
              name="start_location"
              value={parcelData.start_location}
              onChange={handleChange}
            >
              {options}
            </select>
          </div>

          <div className={styles.locDiv}>
            <label className={styles.locLabel}>End Location</label>
            <select
              className={styles.select}
              name="end_location"
              value={parcelData.end_location}
              onChange={handleChange}
            >
              {options}
            </select>
          </div>

          <button className={styles.submit} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserParcelEditor;
