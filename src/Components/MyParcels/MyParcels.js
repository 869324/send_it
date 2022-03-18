import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { AiOutlineSearch } from "react-icons/ai";

import styles from "./MyParcels.module.css";

import { setParcels } from "../../Redux/Actions/ParcelActions";

function MyParcels(props) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const parcels = useSelector((state) => state.parcels);
  const states = useSelector((state) => state.states);
  const user = useSelector((state) => state.user);

  const [order, setOrder] = useState("date desc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchParcels();
  }, []);

  function fetchParcels() {
    axios
      .post(`http://localhost:8000/parcels/getParcels`, {
        page: page,
        user: user.id,
        order: order,
        search: search,
      })
      .then((res) => {
        dispatch(setParcels(res.data.parcels));
      });
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.heading}>My Delivery Orders</h1>
      </div>

      <div className={styles.actions}>
        <div className={styles.searchDiv}>
          <input
            className={styles.search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <AiOutlineSearch
            className={styles.searchIcon}
            onClick={fetchParcels}
          />
        </div>

        <div className={styles.sortDiv}>
          <label className={styles.sortText}>Sort</label>
          <select
            className={styles.sort}
            name="sort"
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
              fetchParcels();
            }}
          >
            <option value={"date desc"}>Date Desc</option>
            <option value={"date asc"}>Date Asc</option>
            <option value={"desc asc"}>Description Asc</option>
            <option value={"desc desc"}>Description Desc</option>
          </select>
        </div>
      </div>

      <div className={styles.cont}>
        {parcels.map((parcel, id) => {
          return (
            <div className={styles.row}>
              <label className={styles.name}>{`${id + 1}:    ${
                parcel.description
              }`}</label>

              <div className={styles.data}>
                <label className={styles.category}>From:</label>
                <label className={styles.value}>
                  {
                    states.stations.find(
                      (station) => station.id == parcel.start_location
                    ).name
                  }
                </label>
              </div>

              <div className={styles.data}>
                <label className={styles.category}>To:</label>
                <label className={styles.value}>
                  {
                    states.stations.find(
                      (station) => station.id == parcel.end_location
                    ).name
                  }
                </label>
              </div>

              <div className={styles.data}>
                <label className={styles.category}>Receiver's phone:</label>
                <label
                  className={styles.value}
                >{`+254${parcel.receiver_number}`}</label>
              </div>

              <div className={styles.data}>
                <label className={styles.category}>Status:</label>
                <label className={styles.value}>
                  {parcel.isDelivered == "true"
                    ? "Parcel was delivered"
                    : parcel.isSent == "true"
                    ? "Parcel is enroute"
                    : "Parcel has not departed yet"}
                </label>
              </div>

              <button className={styles.update}>Update Information</button>
              <button className={styles.order}>Cancel Order</button>
              <button className={styles.track}>Track</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyParcels;
