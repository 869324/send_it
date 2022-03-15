import { NavLink, useNavigate } from "react-router-dom";
import moment from "moment";
import { useState, useEffect } from "react";
import { GiKenya, GiReceiveMoney } from "react-icons/gi";
import { FaRoad } from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";
import { BsArrowDown } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";

import styles from "./Home.module.css";
import bg from "../../assets/images/road-marking.webp";

function Home(props) {
  const navigate = useNavigate();
  let username = "Javan";
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    setInterval(greet(), 60000);
  }, []);

  function greet() {
    const now = moment();
    const hour = now.hours();

    if (hour > 16 && greeting != "Good evening") {
      setGreeting("Good evening");
    } else if (hour > 11 && greeting != "Good afternoon") {
      setGreeting("Good afternoon");
    } else if (hour > 3 && greeting != "Good morning") {
      setGreeting("Good morning");
    } else {
      if (greeting != "Hello") {
        setGreeting("Hello");
      }
    }
  }

  function goToParcels() {
    navigate("/user/parcels");
  }

  return (
    <main className={styles.main} style={{ backgroundImage: `url(${bg})` }}>
      <div className={styles.overlay}>
        <div className={styles.header}>
          <MdWavingHand className={styles.wave} size={42} />
          <h1 className={styles.heading}>{`${greeting} ${username}`}</h1>
        </div>
        <p className={styles.desc}>
          <b>Send It</b> we are your go-to service provider for all your parcel
          needs<br></br> We offer parcel delivery services to our esteemed
          customers and it is our pleasure to serve you.
        </p>

        <div className={styles.ad}>
          <BsArrowDown className={styles.arrow} size={28} />
          <label className={styles.adText}>
            {" "}
            Here are some goodies you will enjoy from us
          </label>
        </div>

        <div className={styles.info}>
          <div className={styles.tile}>
            <GiKenya className={styles.tileIcon} size={70} />
            <p className={styles.tileText}>
              Enjoy our services across the country
            </p>
          </div>

          <div className={styles.tile}>
            <GiReceiveMoney className={styles.tileIcon} size={70} />
            <p className={styles.tileText}>
              Our services are efficient and affordable
            </p>
          </div>

          <div className={styles.tile}>
            <FaRoad className={styles.tileIcon} size={70} />
            <p className={styles.tileText}>
              We respond and act to your requests fast
            </p>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.parcels} onClick={goToParcels}>
            Continue to Parcels
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;
