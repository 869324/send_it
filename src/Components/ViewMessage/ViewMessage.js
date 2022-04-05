import styles from "./ViewMessage.module.css";

import { getMessages } from "../../Redux/Actions/MessageActions";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";

function ViewMessage(props) {
  const dispatch = useDispatch();
  return (
    <div className={styles.bg}>
      <div className={styles.cont}>
        <GrClose
          className={styles.close}
          size={21}
          onClick={() => {
            dispatch(getMessages(props.messagesData));
            props.setShowMessage(false);
          }}
        />

        <h2 className={styles.heading}>Message</h2>

        <div className={styles.infoDiv}>
          <label className={styles.infoLabel}>From:</label>
          <label className={styles.info}>{props.message.name}</label>
        </div>

        <div className={styles.infoDiv}>
          <label className={styles.infoLabel}>Email:</label>
          <label className={styles.info}>{props.message.email}</label>
        </div>

        <div className={styles.infoDiv}>
          <label className={styles.infoLabel}>Message</label>
          <label className={styles.messageText}>{props.message.message}</label>
        </div>
      </div>
    </div>
  );
}

export default ViewMessage;
