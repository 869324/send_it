import { useState } from "react";

import styles from "./HomeParcels.module.css";
import bg from "../../assets/images/road-marking.webp";

import AddParcel from "../AddParcel/AddParcel";
import MyParcels from "../MyParcels/MyParcels";

function Home(props) {
  const [panel, setPanel] = useState("MyParcels");

  return (
    <main className={styles.main}>
      <div className={styles.panel}>
        {panel == "MyParcels" && <MyParcels />}
        {panel == "AddParcel" && <AddParcel />}
      </div>
    </main>
  );
}

export default Home;
