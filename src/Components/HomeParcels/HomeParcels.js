import { Routes, Route } from "react-router-dom";

import styles from "./HomeParcels.module.css";
import UserDashboard from "../UserDashboard/UserDashboard";

function Home(props) {
  return (
    <main className={styles.main}>
      <UserDashboard />
    </main>
  );
}

export default Home;
