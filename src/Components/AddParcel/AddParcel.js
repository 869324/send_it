import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

import styles from "./AddParcel.module.css";
import { changePanel } from "../../Redux/Actions/UtilsActions";
import { addParcel, resetAddParcels } from "../../Redux/Actions/ParcelActions";

function AddParcel(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addParcelState = useSelector((state) => state.parcels.add);
  const { stations } = useSelector((state) => state.utils);
  const { user } = useSelector((state) => state.user);

  const cost = "1500";

  const [parcelData, setParcelData] = useState({
    description: "",
    receiverNumber: "",
    startLocation: stations[0].id,
    endLocation: stations[0].id,
    sender_id: user.id,
    cost: 1500,
  });

  useEffect(() => {
    dispatch(changePanel("/user/parcels/newOrder"));
  }, []);

  useEffect(() => {
    const { error, loading, status } = addParcelState;
    if (status) {
      swal({
        icon: "success",
        text: "Order has been submitted",
      });
      navigate("/user/parcels/orders");
    } else if (error != "" && !loading) {
      swal({
        icon: "error",
        text: "Order not submitted",
      });
    }
  }, [addParcelState]);

  useEffect(() => {
    return () => {
      dispatch(resetAddParcels());
    };
  }, []);

  function handleChange(e) {
    setParcelData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function submit(event) {
    event.preventDefault();

    if (parcelData.startLocation != parcelData.endLocation) {
      swal({
        title: "Confirm your order",
        text: `You will be charged KSH ${cost} for this order`,
        buttons: ["Cancel order", "Confirm order!"],
      }).then((isConfirm) => {
        if (isConfirm) {
          dispatch(addParcel(parcelData));
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

  const options = stations.map((station) => {
    return <option value={station.id}>{station.name}</option>;
  });

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Make a delivery order</h1>
      </div>

      <form className={styles.form} onSubmit={submit}>
        <h2 className={styles.heading2}>Order</h2>

        <input
          className={styles.input}
          value={parcelData.description}
          name="description"
          onChange={handleChange}
          placeholder="Item description"
          required
        />
        <input
          className={styles.input}
          value={parcelData.receiverNumber}
          type="number"
          name="receiverNumber"
          onChange={handleChange}
          placeholder="Receiver's phone number"
          minLength={10}
          maxLength={10}
          required
        />

        <div className={styles.locDiv}>
          <label className={styles.locLabel}>From</label>
          <select
            className={styles.select}
            name="startLocation"
            onChange={handleChange}
          >
            {options}
          </select>
        </div>

        <div className={styles.locDiv}>
          <label className={styles.locLabel}>To</label>
          <select
            className={styles.select}
            name="endLocation"
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
  );
}

export default AddParcel;
