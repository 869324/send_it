import styles from "./Profile.module.css";

import { GrClose } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

function Profile(props) {
  const { user } = useSelector((state) => state.user.login);
  return (
    <div className={styles.bg}>
      <div className={styles.profile}>
        <GrClose
          className={styles.close}
          size={21}
          onClick={() => props.setShowProfile(false)}
        />

        <h2 className={styles.heading}>My Profile</h2>

        <div className={styles.id}>
          <FaUser className={styles.pic} size={70} />
          <div className={styles.info}>
            <div>
              <label className={styles.label}>Name:</label>
              <label className={styles.value}>{user.fullname}</label>
            </div>

            <div>
              <label className={styles.label}>Email:</label>
              <label className={styles.value}>{user.email}</label>
            </div>
          </div>
        </div>

        <div className={styles.otherInfo}>
          <div>
            <label className={styles.label}>Username:</label>
            <label className={styles.value}>{user.username}</label>
          </div>

          <div>
            <label className={styles.label}>Phone:</label>
            <label className={styles.value}>{user.phone}</label>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default Profile;
