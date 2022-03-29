import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Routes, useNavigate, Route, Navigate } from "react-router-dom";
import swal from "sweetalert";
import { useEffect, useState } from "react";

import logo from "../../assets/logos/black.png";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import AdminHome from "../AdminHome/AdminHome";
import Orders from "../Orders/Orders";
import Messages from "../Messages/Messages";
import Accounts from "../Accounts/Accounts";

import { AiFillCaretDown, AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdPersonPin } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

import styles from "./Admin.module.css";
import { logout } from "../../Redux/Actions/UserActions";
import { getStations } from "../../Redux/Actions/UtilsActions";
import Profile from "../Profile/Profile";

function Admin(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length == 0) {
      navigate("/login");
      swal({
        text: "Login to continue",
      });
    }
  }, [user]);

  useEffect(() => {
    dispatch(getStations());
  }, []);

  return (
    <main className={styles.main}>
      {showProfile && <Profile setShowProfile={setShowProfile} />}
      <header className={styles.header}>
        <div className={styles.logoDiv}>
          <img className={styles.logo} src={logo} />
          <h2 className={styles.name}>Send It</h2>
        </div>

        <h1 className={styles.heading}>Management Console</h1>

        {Object.keys(user).length > 0 && (
          <div className={styles.accDiv}>
            <label className={styles.username}>{user.username}</label>
            <div
              className={styles.menuDiv}
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
            >
              <MdPersonPin className={styles.avatar} size={35} />
              <AiFillCaretDown className={styles.dropIcon} />
              {showMenu && (
                <div className={styles.menu}>
                  <div className={styles.menuItem}>
                    <CgProfile className={styles.menuIcon} />
                    <label
                      className={styles.menuText}
                      onClick={() => {
                        setShowProfile(true);
                      }}
                    >
                      Profile
                    </label>
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
      </header>

      <div className={styles.cont}>
        <AdminDashboard />
        <div className={styles.panel}>
          <Routes>
            <Route exact path="/" element={<Navigate to={"home"} />}></Route>
            <Route path="home" element={<AdminHome />}></Route>
            <Route path="orders" element={<Orders />}></Route>
            <Route path="messages" element={<Messages />}></Route>
            <Route path="accounts" element={<Accounts />}></Route>
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default Admin;
