import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { login, resetLogin } from "../../Redux/Actions/UserActions";
import styles from "./Login.module.css";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import logo from "../../assets/logos/default.jpeg";

function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginInfo = useSelector((state) => state.user);
  const { loginRedirect } = useSelector((state) => state.utils);

  const [forgotPassword, setForgotPassword] = useState(false);

  const [userData, setUserData] = useState({
    identity: "",
    password: "",
  });

  useEffect(() => {
    return () => {
      dispatch(resetLogin());
    };
  }, []);

  useEffect(() => {
    const { user, loading, loginError } = loginInfo;

    if (Object.keys(user).length > 0) {
      swal({
        title: "Login Successful",
        icon: "success",
      });
      navigate(loginRedirect);
    } else if (loading) {
      swal({
        text: "Loading ...",
      });
    } else if (loginError != "") {
      swal({
        title: "Login failed",
        icon: "error",
        text: loginError,
      });
    }
  }, [loginInfo]);

  function handleChange(e) {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function submit(event) {
    event.preventDefault();

    dispatch(login(userData));
  }

  return (
    <main className={styles.main}>
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
              value={userData.identity}
              name="identity"
              onChange={handleChange}
              placeholder="Username or Email"
              required
            />

            <input
              className={styles.input}
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
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
