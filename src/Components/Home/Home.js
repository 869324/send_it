import { NavLink } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import styles from "./Home.module.css";
import bg from "../../assets/images/road-marking.webp";

function Home(props) {
  let username = "";
  let day = "Afternoon";
  return (
    <main className={styles.main} style={{ backgroundImage: `url(${bg})` }}>
      <div className={styles.overlay}>
        <h1 className={styles.heading}>{`Good ${day} ${username}`}</h1>

        <div>
          <button>Continue to Parcels</button>
          <div>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
