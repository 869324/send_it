import styles from "./ForgotPassword.module.css";

function ForgotPassword(props) {
  function submit(event) {
    event.preventDefault();
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <button
        className={styles.closeButton}
        type="button"
        onClick={() => props.setForgotPassword(false)}
      >
        +
      </button>
      <h2 className={styles.heading}>Recover Your Password</h2>
      <input
        className={styles.input}
        type="email"
        placeholder="Enter Your Email Address"
        required
      />
      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
}

export default ForgotPassword;
