import { FaLuggageCart } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { SiAddthis } from "react-icons/si";

import styles from "./UserDashboard.module.css";

function UserDashboard(props) {
  return (
    <div className={styles.dashboard}>
      <div
        className={props.panel == "MyData" ? styles.tabActive : styles.tab}
        onClick={() => {
          props.setPanel("MyData");
        }}
      >
        <ImStatsDots className={styles.tabIcon} size={21} />
        <label className={styles.tabText}>My Data</label>
      </div>

      <div
        className={props.panel == "NewOrder" ? styles.tabActive : styles.tab}
        onClick={() => {
          props.setPanel("NewOrders");
        }}
      >
        <SiAddthis className={styles.tabIcon} size={21} />
        <label className={styles.tabText}>New Order</label>
      </div>

      <div
        className={props.panel == "MyOrders" ? styles.tabActive : styles.tab}
        onClick={() => {
          props.setPanel("MyOrders");
        }}
      >
        <FaLuggageCart className={styles.tabIcon} size={21} />
        <label className={styles.tabText}>My Orders</label>
      </div>
    </div>
  );
}

export default UserDashboard;
