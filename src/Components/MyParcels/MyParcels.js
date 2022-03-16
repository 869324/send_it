import styles from "./MyParcels.module.css";

function MyParcels(props) {
  return (
    <div className={styles.main}>
      <h2 className={styles.heading}></h2>
      <div>
        <h1>My Parcels</h1>
      </div>
    </div>
  );
}

export default MyParcels;
