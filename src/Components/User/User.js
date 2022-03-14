import { Routes, Route, Navigate } from "react-router-dom";

import styles from "./User.module.css";
import Home from "../Home/Home";
import NavBar from "../NavBar/NavBar";
import HomeParcels from "../HomeParcels/HomeParcels";

function User(props) {
  console.log(props.match);
  return (
    <div className="App">
      <NavBar className="navBar" />

      <Routes>
        <Route index element={<Navigate to="/user/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/parcels" element={<HomeParcels />} />
        <Route path="/aboutUs" element={<HomeParcels />} />
      </Routes>
    </div>
  );
}

export default User;
