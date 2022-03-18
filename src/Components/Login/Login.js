import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";
import { login } from "../../Redux/Actions/UserActions";
import swal from "sweetalert";

import styles from "./Login.module.css";
import bg from "../../assets/images/dark.jpg";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import logo from "../../assets/logos/default.jpeg";

function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const states = useSelector((state) => state.states);

  const [forgotPassword, setForgotPassword] = useState(false);
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");

  function submit(event) {
    event.preventDefault();
    Axios.post("http://localhost:8000/users/login", {
      identity: identity,
      password: password,
    })
      .then((response) => {
        const loggedIn = response.data.status;

        if (loggedIn) {
          dispatch(login(response.data.user));
          navigate(states.loginRedirect);
        } else {
          swal("Invalid login credentials", {
            title: "Login Failed",
            icon: "error",
          });
        }
      })
      .catch((error) => {});
  }

  return (
    <main className={styles.main} style={{ backgroundImage: `url(${bg})` }}>
      <div className={styles.overlay}>
        {forgotPassword && (
          <ForgotPassword setForgotPassword={setForgotPassword} />
        )}
        {!forgotPassword && (
          <form className={styles.form} onSubmit={submit}>
            <div className={styles.header}>
              <img className={styles.logo} src={logo} />
              <h2 className={styles.heading}>Send It Log In</h2>
            </div>
            <input
              className={styles.input}
              value={identity}
              onChange={(e) => {
                setIdentity(e.target.value);
              }}
              placeholder="Username or Email"
              required
            />
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              required
            />
            <button className={styles.button} type="submit">
              Login
            </button>
            <div className={styles.signup}>
              <button
                className={styles.forgotPassword}
                type="button"
                onClick={(e) => setForgotPassword(true)}
              >
                Forgot Your Password?
              </button>
              <NavLink className={styles.link} to="/signup">
                Sign Up
              </NavLink>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

export default Login;
