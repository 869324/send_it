import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Routes, useNavigate, Route, Navigate } from "react-router-dom";
import swal from "sweetalert";
import { useEffect, useState } from "react";

import styles from "./HomeParcels.module.css";

import AddParcel from "../AddParcel/AddParcel";
import MyParcels from "../MyParcels/MyParcels";
import UserDashboard from "../UserDashboard/UserDashboard";
import GetStarted from "../GetStarted/GetStarted";
import Track from "../Track/Track";

import {
  changeLoginRedirect,
  getStations,
} from "../../Redux/Actions/UtilsActions";

function Home(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stations, activePanel } = useSelector((state) => state.utils);
  const { user } = useSelector((state) => state.user.login);

  useEffect(() => {
    if (Object.keys(user).length == 0) {
      navigate("/login");
      dispatch(changeLoginRedirect("/user/parcels"));

      swal({
        title: "Login to Continue",
      });
    }
  }, [user]);

  useEffect(() => {
    dispatch(getStations());
  }, []);

  return (
    <main className={styles.main}>
      <UserDashboard />
      <div className={styles.panel}>
        <Routes>
          <Route exact path="/" element={<Navigate to={activePanel} />}></Route>
          <Route path="getStarted" element={<GetStarted />}></Route>
          <Route path="orders" element={<MyParcels />}></Route>
          <Route path="newOrder" element={<AddParcel />}></Route>
          <Route path="trackDeliveries" element={<Track />}></Route>
        </Routes>
      </div>
    </main>
  );
}

export default Home;
