import { useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Login.module.css";
import bg from "../../assets/images/road-marking.webp";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import logo from "../../assets/logos/default.jpeg";

function Login(props) {
  const [forgotPassword, setForgotPassword] = useState(false);

  function submit(event) {
    event.preventDefault();
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
            <input className={styles.input} placeholder="Username" required />
            <input
              className={styles.input}
              type="password"
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
