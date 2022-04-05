import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { signup } from "../../Redux/Actions/UserActions";

import { resetSignup } from "../../Redux/Actions/UserActions";
import styles from "./Signup.module.css";
import bg from "../../assets/images/dark.jpg";
import logo from "../../assets/logos/default.jpeg";

function Signup(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupInfo = useSelector((state) => state.user.signup);

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function submit(event) {
    event.preventDefault();

    dispatch(signup(userData));
  }

  useEffect(() => {
    const { loading, error, status } = signupInfo;

    if (status) {
      swal("Login to continue", {
        title: "Sign up successful",
        icon: "success",
      });
      navigate("/login");
      dispatch(resetSignup());
    } else if (loading) {
      swal({
        text: "Loading ...",
      });
    } else if (error != "") {
      swal({
        title: "Sign up Failed",
        icon: "error",
        text: error,
      });
    }
  }, [signupInfo]);

  useEffect(() => {
    return () => {
      dispatch(resetSignup());
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.overlay}>
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.header}>
            <img className={styles.logo} src={logo} />
            <h2 className={styles.heading}>Create Account</h2>
          </div>

          <input
            className={styles.input}
            value={userData.firstname}
            name="firstname"
            onChange={handleChange}
            placeholder="Firstname"
            required
          />
          <input
            className={styles.input}
            value={userData.lastname}
            name="lastname"
            onChange={handleChange}
            placeholder="Lastname"
            required
          />
          <input
            className={styles.input}
            value={userData.username}
            name="username"
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            className={styles.input}
            type="number"
            value={userData.phone}
            name="phone"
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <input
            className={styles.input}
            type="email"
            value={userData.email}
            name="email"
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          <input
            className={styles.input}
            type="password"
            value={userData.password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button className={styles.button} type="submit">
            Sign Up
          </button>

          <NavLink className={styles.link} to="/login">
            Login
          </NavLink>
        </form>
      </div>
    </main>
  );
}

export default Signup;
