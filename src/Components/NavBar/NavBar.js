import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../Redux/Actions/UserActions";

import { AiFillCaretDown } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { AiFillSetting } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

import styles from "./NavBar.module.css";

import logo from "../../assets/logos/black.png";
import userImg from "../../assets/images/user.png";

function NavBar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.user);

  function login(event) {
    navigate("/login");
  }

  function signup(event) {
    navigate("/signup");
  }
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
          to="services"
          className={(navData) =>
            navData.isActive ? styles.active : styles.link
          }
        >
          Services
        </NavLink>

        <NavLink
          to="aboutUs"
          className={(navData) =>
            navData.isActive ? styles.active : styles.link
          }
        >
          About Us
        </NavLink>

        <NavLink
          to="contactUs"
          className={(navData) =>
            navData.isActive ? styles.active : styles.link
          }
        >
          Contact Us
        </NavLink>
      </div>

      {Object.keys(user).length > 0 && (
        <div className={styles.accDiv}>
          <label className={styles.username}>{user.username}</label>
          <div
            className={styles.menuDiv}
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <img className={styles.avatar} src={userImg} />
            <AiFillCaretDown className={styles.dropIcon} />
            {showMenu && (
              <div className={styles.menu}>
                <div className={styles.menuItem}>
                  <CgProfile className={styles.menuIcon} />
                  <label className={styles.menuText}>Profile</label>
                </div>

                <div
                  className={styles.menuItem}
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <BiLogOut className={styles.menuIcon} />
                  <label className={styles.menuText}>Logout</label>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {Object.keys(user).length == 0 && (
        <div className={styles.loginDiv}>
          <button className={styles.login} onClick={login}>
            Login
          </button>
          <button id={styles.signup} onClick={signup}>
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
