import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./GetStarted.module.css";
import { changePanel } from "../../Redux/Actions/UtilsActions";

import order from "../../assets/images/order.png";
import view from "../../assets/images/view.png";
import nav from "../../assets/images/nav.png";
import homePic from "../../assets/images/Domestic-delivery.png";

function GetStarted(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activePanel } = useSelector((state) => state.utils);

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Make and manage all your orders</h1>

      <img className={styles.homePic} src={homePic} />

      <div className={styles.actions}>
        <div className={styles.action}>
          <img className={styles.actionImg} src={order} />

          <button
            className={styles.actionText}
            onClick={() => {
              navigate("/user/parcels/newOrder");
              dispatch(changePanel("/user/parcels/newOrder"));
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
              navigate("/user/parcels/orders");
              dispatch(changePanel("/user/parcels/orders"));
            }}
          >
            See my orders
          </button>
        </div>

        <div className={styles.action}>
          <img className={styles.actionImg} src={nav} />
          <button
            className={styles.actionText}
            onClick={() => {
              navigate("/user/parcels/trackDeliveries");
              dispatch(changePanel("/user/parcels/trackDeliveries"));
            }}
          >
            Track deliveries
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
