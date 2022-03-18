import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import swal from "sweetalert";

import styles from "./AddParcel.module.css";
import axios from "axios";

function AddParcel(props) {
  const states = useSelector((state) => state.states);
  const user = useSelector((state) => state.user);

  const cost = "1500";

  const [desc, setDesc] = useState("");
  const [receiver, setReceiver] = useState("");
  const [start, setStart] = useState(states.stations[0].name);
  const [end, setEnd] = useState(states.stations[0].name);

  const options = states.stations.map((station) => {
    return <option value={station.name}>{station.name}</option>;
  });

  function submit(event) {
    event.preventDefault();
    if (start != end) {
      swal({
        title: "Confirm your order",
        text: `You will be charged KSH ${cost} for this order`,
        buttons: ["Cancel order", "Confirm order!"],
      }).then((isConfirm) => {
        if (isConfirm) {
          axios
            .post("http://localhost:8000/parcels/addParcel", {
              description: desc,
              sender_id: user.id,
              receiver_number: receiver,
              start_location: states.stations.find(
                (station) => station.name == start
              ).id,
              end_location: states.stations.find(
                (station) => station.name == end
              ).id,
              cost: cost,
            })
            .then((res) => {
              if (res.data.status) {
                swal({
                  icon: "success",
                  text: "Order submitted successfuly ",
                });
              } else {
                swal({
                  icon: "error",
                  title: "Submission failed",
                  text: "Try again later ",
                });
              }
            })
            .catch((err) => {});
        } else {
          swal("Order has been aborted");
        }
      });
    } else {
      swal({
        icon: "warning",
        text: "The source and destination of your parcel are the same!",
      });
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Make a delivery order</h1>
      </div>

      <form className={styles.form} onSubmit={submit}>
        <input
          className={styles.input}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Item description"
          required
        />
        <input
          className={styles.input}
          value={receiver}
          type="number"
          onChange={(e) => setReceiver(e.target.value)}
          placeholder="Receiver's Phone"
          required
        />

        <div className={styles.locDiv}>
          <label className={styles.locLabel}>Start Location</label>
          <select
            className={styles.select}
            name="startLocation"
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
  );
}

export default AddParcel;
