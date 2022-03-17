import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import styles from "./HomeParcels.module.css";

import AddParcel from "../AddParcel/AddParcel";
import MyParcels from "../MyParcels/MyParcels";
import UserDashboard from "../UserDashboard/UserDashboard";
import GetStarted from "../GetStarted/GetStarted";
import { changePanel } from "../../Redux/Actions/StatesActions";
import { setStations } from "../../Redux/Actions/StatesActions";

function Home(props) {
  const dispatch = useDispatch();
  const states = useSelector((state) => state.states);

  axios.get("http://localhost:8000/parcels/getStations").then((res) => {
    console.log(res.data.stations);
    dispatch(setStations(res.data.stations));
  });

  const panel =
    states.panel == "getStarted" ? (
      <GetStarted />
    ) : states.panel == "myOrders" ? (
      <MyParcels />
    ) : states.panel == "newOrder" ? (
      <AddParcel />
    ) : (
      <AddParcel />
    );

  return (
    <main className={styles.main}>
      <UserDashboard />
      <div className={styles.panel}>{panel}</div>
    </main>
  );
}

export default Home;
