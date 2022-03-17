import { useSelector, useDispatch } from "react-redux";

import { FaLuggageCart } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { SiAddthis } from "react-icons/si";

import styles from "./UserDashboard.module.css";

import { changePanel } from "../../Redux/Actions/StatesActions";

function UserDashboard(props) {
  const dispatch = useDispatch();

  const states = useSelector((state) => state.states);

  return (
    <div className={styles.dashboard}>
      <div
        className={states.panel === "newOrder" ? styles.tabActive : styles.tab}
        onClick={() => {
          dispatch(changePanel("newOrder"));
        }}
      >
        <SiAddthis className={styles.tabIcon} size={21} />
        <label className={styles.tabText}>New Order</label>
      </div>

      <div
        className={states.panel === "myOrders" ? styles.tabActive : styles.tab}
        onClick={() => {
          dispatch(changePanel("myOrders"));
        }}
      >
        <FaLuggageCart className={styles.tabIcon} size={21} />
        <label className={styles.tabText}>My Orders</label>
      </div>

      <div
        className={
          states.panel === "trackDelivery" ? styles.tabActive : styles.tab
        }
        onClick={() => {
          dispatch(changePanel("trackDelivery"));
        }}
      >
        <ImStatsDots className={styles.tabIcon} size={21} />
        <label className={styles.tabText}>Track Deliveries</label>
      </div>
    </div>
  );
}

export default UserDashboard;
