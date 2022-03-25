import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { FaLuggageCart } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { SiAddthis } from "react-icons/si";

import styles from "./UserDashboard.module.css";

import { changePanel } from "../../Redux/Actions/UtilsActions";

function UserDashboard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const utils = useSelector((state) => state.utils);

  return (
    <div className={styles.dashboard}>
      <NavLink
        to="newOrder"
        className={(navData) =>
          navData.isActive ? styles.active : styles.link
        }
      >
        <SiAddthis className={styles.tabIcon} size={21} />
        New Order
      </NavLink>

      <NavLink
        to="orders"
        className={(navData) =>
          navData.isActive ? styles.active : styles.link
        }
      >
        <FaLuggageCart className={styles.tabIcon} size={21} />
        My Orders
      </NavLink>

      <NavLink
        to="trackDeliveries"
        className={(navData) =>
          navData.isActive ? styles.active : styles.link
        }
      >
        <ImStatsDots className={styles.tabIcon} size={21} />
        Tracking
      </NavLink>
    </div>
  );
}

export default UserDashboard;
