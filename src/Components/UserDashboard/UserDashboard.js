import { AiFillDashboard, AiFillHome } from "react-icons/ai";
import { FaLuggageCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import styles from "./UserDashboard.module.css";

function HomeDashboard(props) {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <AiFillDashboard className={styles.dashIcon} />
        <h2 className={styles.heading}>Dashboard</h2>
      </div>

      <div className={styles.tab}>
        <FaLuggageCart className={styles.tabIcon} size={42} />
        <label className={styles.tabText}>My Parcels</label>
      </div>

      <div className={styles.tab}>
        <FaLuggageCart className={styles.tabIcon} size={42} />
        <label className={styles.tabText}>Add Parcel</label>
      </div>

      <div className={styles.tab}>
        <FaLuggageCart className={styles.tabIcon} size={42} />
        <label className={styles.tabText}>My Parcels</label>
      </div>

      <div className={styles.tab}>
        <FaLuggageCart className={styles.tabIcon} size={42} />
        <label className={styles.tabText}>My Parcels</label>
      </div>
    </div>
  );
}

export default HomeDashboard;
