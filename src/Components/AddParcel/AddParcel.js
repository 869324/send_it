import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import styles from "./AddParcel.module.css";

function AddParcel(props) {
  const states = useSelector((state) => state.states);

  const [desc, setDesc] = useState("");
  const [receiver, setReceiver] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const options = states.stations.map((station) => {
    return <option value={station.name}>{station.name}</option>;
  });

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>Add Parcel</h1>
      </div>

      <form className={styles.form}>
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Item description"
        />
        <input
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          placeholder="Receiver's Phone"
        />

        <div className={styles.locDiv}>
          <label className={styles.locLabel}>Start Location</label>
          <select
            name="startLocation"
            onChange={(e) => setStart(e.target.value)}
          >
            {options}
          </select>
        </div>

        <div className={styles.locDiv}>
          <label className={styles.locLabel}>End Location</label>
          <select name="endLocation" onChange={(e) => setEnd(e.target.value)}>
            {options}
          </select>
        </div>
      </form>
    </div>
  );
}

export default AddParcel;
