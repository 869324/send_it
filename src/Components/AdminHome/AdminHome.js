import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import order from "../../assets/images/order.png";
import view from "../../assets/images/view.png";
import nav from "../../assets/images/nav.png";
import homePic from "../../assets/images/Domestic-delivery.png";
import styles from "./AdminHome.module.css";

function AdminHome(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={styles.main}>
      <img className={styles.homePic} src={homePic} />

      <div className={styles.actions}>
        <div className={styles.action}>
          <img className={styles.actionImg} src={order} />

          <button
            className={styles.actionText}
            onClick={() => {
              navigate("/admin/orders");
            }}
          >
            Orders
          </button>
        </div>

        <div className={styles.action}>
          <img className={styles.actionImg} src={view} />
          <button
            className={styles.actionText}
            onClick={() => {
              navigate("/admin/messages");
            }}
          >
            Messages
          </button>
        </div>

        <div className={styles.action}>
          <img className={styles.actionImg} src={nav} />
          <button
            className={styles.actionText}
            onClick={() => {
              navigate("/admin/accounts");
            }}
          >
            Accounts
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
