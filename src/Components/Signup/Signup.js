import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import swal from "sweetalert";
import { useState } from "react";

import styles from "./Signup.module.css";
import bg from "../../assets/images/dark.jpg";
import logo from "../../assets/logos/default.jpeg";

function Signup(props) {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(event) {
    event.preventDefault();
    Axios.post("http://localhost:8000/users/addUser", {
      firstname: firstname,
      lastname: lastname,
      username: username,
      phone: phone,
      email: email,
      password: password,
    })
      .then((response) => {
        if (response.data.status) {
          swal("Login to continue", {
            title: "Sign up successful",
            icon: "success",
          });
          navigate("/login");
        } else {
          swal(response.data.error, {
            title: "Sign up Failed",
            icon: "error",
          });
        }
      })
      .catch((error) => {});
  }

  return (
    <main className={styles.main} style={{ backgroundImage: `url(${bg})` }}>
      <div className={styles.overlay}>
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.header}>
            <img className={styles.logo} src={logo} />
            <h2 className={styles.heading}>Create Account</h2>
          </div>

          <input
            className={styles.input}
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            placeholder="Firstname"
            required
          />
          <input
            className={styles.input}
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            placeholder="Lastname"
            required
          />
          <input
            className={styles.input}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Username"
            required
          />
          <input
            className={styles.input}
            type="number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            placeholder="Phone Number"
            required
          />
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email Address"
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
