import { useState } from "react";

import styles from "./HomeParcels.module.css";

import AddParcel from "../AddParcel/AddParcel";
import MyParcels from "../MyParcels/MyParcels";

import UserDashboard from "../UserDashboard/UserDashboard";
import UserData from "../UserData/UserData";

function Home(props) {
  const [panel, setPanel] = useState("MyData");

  return (
    <main className={styles.main}>
      <UserDashboard panel={panel} setPanel={setPanel} />
      <div className={styles.panel}>
        {panel == "MyData" && <UserData setPanel={setPanel} />}
        {panel == "MyOrders" && <MyParcels />}
        {panel == "NewOrder" && <AddParcel />}
      </div>
    </main>
  );
}

export default Home;
