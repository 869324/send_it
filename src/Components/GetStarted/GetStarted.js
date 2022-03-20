import { useDispatch } from "react-redux";

import styles from "./GetStarted.module.css";

import { changePanel } from "../../Redux/Actions/StatesActions";

import order from "../../assets/images/order.png";
import view from "../../assets/images/view.png";
import nav from "../../assets/images/nav.png";
import homePic from "../../assets/images/Domestic-delivery.png";

function GetStarted(props) {
  const dispatch = useDispatch();
  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>
        Make and manage all your orders with ease
      </h1>

      <img className={styles.homePic} src={homePic} />

      <div className={styles.actions}>
        <div className={styles.action}>
          <img className={styles.actionImg} src={order} />
          <button
            className={styles.actionText}
            onClick={() => {
              dispatch(changePanel("newOrder"));
            }}
          >
            Order a delivery
          </button>
        </div>

        <div className={styles.action}>
          <img className={styles.actionImg} src={view} />
          <button
            className={styles.actionText}
            onClick={() => {
              dispatch(changePanel("myOrders"));
            }}
          >
            Manage your deliveries
          </button>
        </div>

        <div className={styles.action}>
          <img className={styles.actionImg} src={nav} />
          <button
            className={styles.actionText}
            onClick={() => {
              dispatch(changePanel("trackDelivery"));
            }}
          >
            Track your Deliveries
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
