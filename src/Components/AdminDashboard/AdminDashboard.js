import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { FaLuggageCart, FaMailBulk, FaUsers } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

import styles from "./AdminDashboard.module.css";

function AdminDashboard(props) {
  const utils = useSelector((state) => state.utils);

  return (
    <div className={styles.dashboard}>
      <NavLink
        to="home"
        className={(navData) =>
          navData.isActive ? styles.active : styles.link
        }
      >
        <AiFillHome className={styles.tabIcon} size={21} />
        Home
      </NavLink>

      <NavLink
        to="orders"
        className={(navData) =>
          navData.isActive ? styles.active : styles.link
        }
      >
        <FaLuggageCart className={styles.tabIcon} size={21} />
        Orders
      </NavLink>

      <NavLink
        to="messages"
        className={(navData) =>
          navData.isActive ? styles.active : styles.link
        }
      >
        <FaMailBulk className={styles.tabIcon} size={21} />
        Messages
      </NavLink>

      <NavLink
        to="accounts"
        className={(navData) =>
          navData.isActive ? styles.active : styles.link
        }
      >
        <FaUsers className={styles.tabIcon} size={21} />
        Accounts
      </NavLink>
    </div>
  );
}

export default AdminDashboard;
