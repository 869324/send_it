import { NavLink } from "react-router-dom";

import styles from "./Signup.module.css";
import bg from "../../assets/images/dark.jpg";
import logo from "../../assets/logos/default.jpeg";

function Signup(props) {
  function submit(event) {
    event.preventDefault();
  }

  return (
    <main className={styles.main} style={{ backgroundImage: `url(${bg})` }}>
      <div className={styles.overlay}>
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.header}>
            <img className={styles.logo} src={logo} />
            <h2 className={styles.heading}>Create Account</h2>
          </div>

          <input className={styles.input} placeholder="Firstname" required />
          <input className={styles.input} placeholder="Lastname" required />
          <input className={styles.input} placeholder="Username" required />
          <input
            className={styles.input}
            type="number"
            placeholder="Phone Number"
            required
          />
          <input
            className={styles.input}
            type="email"
            placeholder="Email Address"
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            required
          />
          <button className={styles.button} type="submit">
            Sign Up
          </button>
          <div className={styles.signup}>
            <NavLink className={styles.link} to="/login">
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signup;
