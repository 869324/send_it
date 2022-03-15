import { Routes, Route, Navigate } from "react-router-dom";

import styles from "./User.module.css";
import Home from "../Home/Home";
import NavBar from "../NavBar/NavBar";
import HomeParcels from "../HomeParcels/HomeParcels";

function User(props) {
  return (
    <main className={styles.user}>
      <NavBar />
      <div className={styles.pages}>
        <Routes>
          <Route index element={<Navigate to="/user/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/parcels" element={<HomeParcels />} />
          <Route path="/aboutUs" element={<HomeParcels />} />
          <Route path="/signup" element={<Navigate to="/signup" />} />
        </Routes>
      </div>
    </main>
  );
}

export default User;
