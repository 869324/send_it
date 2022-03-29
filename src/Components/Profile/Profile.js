import styles from "./Profile.module.css";

function Profile(props) {
  return (
    <div className={styles.bg}>
      <div className={styles.profile}>
        <label className={styles.close} onClick={()=>props.setShowProfile(false)}>+</label>
        <h2>My Profile</h2>

        <div></div>
      </div>
    </div>
  );
}

export default Profile;
