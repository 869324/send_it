import { NavLink } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import logo from "../../assets/logos/black.png";
import user from "../../assets/images/user.png";

import styles from "./NavBar.module.css";

function NavBar(props) {
  let username = "";
  return (
    <nav className={styles.nav}>
      <div className={styles.logoDiv}>
        <img className={styles.logo} src={logo} />
        <h2 className={styles.name}>Send It</h2>
      </div>

      <div className={styles.navigation}>
        <NavLink
          to="home"
          className={(navData) =>
            navData.isActive ? styles.active : styles.link
          }
        >
          Home
        </NavLink>

        <NavLink
          to="parcels"
          className={(navData) =>
            navData.isActive ? styles.active : styles.link
          }
        >
          Parcels
        </NavLink>

        <NavLink
          to="aboutUs"
          className={(navData) =>
            navData.isActive ? styles.active : styles.link
          }
        >
          About Us
        </NavLink>
      </div>

      {username != "" && (
        <div className={styles.accDiv}>
          <label className={styles.username}>{username}</label>
          <div className={styles.menuDiv}>
            <img className={styles.avatar} src={user} />
            <AiFillCaretDown className={styles.dropIcon} />
          </div>
        </div>
      )}

      {username == "" && <button>Login</button>}
    </nav>
  );
}

export default NavBar;
