import styles from "./UserData.module.css";

function UserData(props) {
  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>
        See how you have utilised our services so far
      </h1>

      <div className={styles.data}>
        <div className={styles.orders}></div>
        <div className={styles.time}></div>
        <div className={styles.spending}></div>
      </div>

      <button
        className={styles.button}
        onCick={() => {
          props.setPanel("MyOrders");
        }}
      >My Orders</button>
      
    </div>
  );
}

export default UserData;
