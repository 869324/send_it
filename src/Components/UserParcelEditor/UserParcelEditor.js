import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

import { GrClose } from "react-icons/gr";

import styles from "./UserParcelEditor.module.css";

function UserParcelEditor(props) {
  const states = useSelector((state) => state.states);
  const user = useSelector((state) => state.user);

  const [desc, setDesc] = useState(props.parcel.description);
  const [receiver, setReceiver] = useState(props.parcel.receiver_number);
  const [start, setStart] = useState(
    states.stations.find((station) => station.id == props.parcel.start_location)
      .name
  );
  const [end, setEnd] = useState(
    states.stations.find((station) => station.id == props.parcel.end_location)
      .name
  );

  const options = states.stations.map((station) => {
    return <option value={station.name}>{station.name}</option>;
  });

  function submit(event) {
    event.preventDefault();
    axios
      .put("http://localhost:8000/parcels/updateParcel", {
        id: props.parcel.id,
        start_location: states.stations.find((station) => station.name == start)
          .id,
        end_location: states.stations.find((station) => station.name == end).id,
        receiver_number: receiver,
        description: desc,
      })
      .then((res) => {
        if (res.data.status) {
          props.fetchParcels(props.order);
          swal({
            icon: "success",
            text: "Parcel has been updated",
          });
          props.setShowEditor(false);
        } else {
          swal({
            icon: "error",
            text: "Update could not update, try again later",
          });
        }
      })
      .error((err) => console.log(err));
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
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputDiv}>
            <label className={styles.category}>Receiver Phone</label>
            <input
              className={styles.input}
              value={receiver}
              type="number"
              onChange={(e) => setReceiver(e.target.value)}
              placeholder="Receiver's Phone"
              required
            />
          </div>

          <div className={styles.locDiv}>
            <label className={styles.locLabel}>Start Location</label>
            <select
              className={styles.select}
              name="startLocation"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            >
              {options}
            </select>
          </div>

          <div className={styles.locDiv}>
            <label className={styles.locLabel}>End Location</label>
            <select
              className={styles.select}
              name="endLocation"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
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
