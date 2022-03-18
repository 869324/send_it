import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useEffect, useState } from "react";

import styles from "./HomeParcels.module.css";

import { setParcels } from "../../Redux/Actions/ParcelActions";
import AddParcel from "../AddParcel/AddParcel";
import MyParcels from "../MyParcels/MyParcels";
import UserDashboard from "../UserDashboard/UserDashboard";
import GetStarted from "../GetStarted/GetStarted";
import {
  setStations,
  changeLoginRedirect,
} from "../../Redux/Actions/StatesActions";

function Home(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const states = useSelector((state) => state.states);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (Object.keys(user).length == 0) {
      navigate("/login");
      if (states.loginRedirect != "/user/parcels") {
        dispatch(changeLoginRedirect("/user/parcels"));
      }

      swal({
        title: "Login to Continue",
        text: "You need to log in to access parcel services",
      });
    }
  });

  useEffect(() => {
    axios.get("http://localhost:8000/parcels/getStations").then((res) => {
      dispatch(setStations(res.data.stations));
    });
  }, []);

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
