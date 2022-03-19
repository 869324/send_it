import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { changePanel } from "../../Redux/Actions/StatesActions";

import styles from "./Home.module.css";

import bg from "../../assets/images/dark.jpg";
import homePic from "../../assets/images/Domestic-delivery.png";
import order from "../../assets/images/order.png";
import view from "../../assets/images/view.png";
import nav from "../../assets/images/nav.png";
import contact from "../../assets/images/contact.png";
import kenya from "../../assets/images/kenya.jpg";
import affordable from "../../assets/images/affordable.jpg";
import security from "../../assets/images/security.jpg";
import track from "../../assets/images/track.webp";

function Home(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function newOrder() {
    dispatch(changePanel("newOrder"));
    navigate("/user/parcels");
  }

  function manageOrders() {
    dispatch(changePanel("myOrders"));
    navigate("/user/parcels");
  }

  function trackDeliveries() {
    dispatch(changePanel("trackDelivery"));
    navigate("/user/parcels");
  }

  function contactUs() {
    navigate("/user/contactUs");
  }

  return (
    <main className={styles.home}>
      <div className={styles.main} style={{ backgroundImage: `url(${bg})` }}>
        <div className={styles.overlay}>
          <div className={styles.intro}>
            <div className={styles.picDiv}>
              <img className={styles.homePic} src={homePic} />
            </div>

            <div className={styles.cont}>
              <h1 className={styles.heading}>
                We are your go-to service provider <br></br>for all your parcel
                needs
              </h1>

              <p className={styles.desc}>
                We offer parcel delivery services to our esteemed customers and
                it is our pleasure to serve you.
              </p>
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.tile}>
              <img className={styles.tileImg} src={order} />
              <button className={styles.tileText} onClick={newOrder}>
                Order a delivery
              </button>
            </div>

            <div className={styles.tile}>
              <img className={styles.tileImg} src={view} />
              <button className={styles.tileText} onClick={manageOrders}>
                Manage your deliveries
              </button>
            </div>

            <div className={styles.tile}>
              <img className={styles.tileImg} src={nav} />
              <button className={styles.tileText} onClick={trackDeliveries}>
                Track your Deliveries
              </button>
            </div>

            <div className={styles.tile}>
              <img className={styles.tileImg} src={contact} />
              <button className={styles.tileText} onClick={contactUs}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.adDiv}>
        <h1 className={styles.adHeading}>Benefits of trying us</h1>

        <div className={styles.ad}>
          <img className={styles.adImg} src={kenya} />
          <div className={styles.textDiv}>
            <h3 className={styles.textHeading}>Accessibilty</h3>
            <p className={styles.adText}>
              Our services are accessible from allover across the country. We go
              the extra mile (pun intended) to cover all Routes accorind to our
              clients' needs. You can contatct us from every part of the country
              through our contact channels
            </p>
          </div>
        </div>
      </div>

      <div className={styles.ad}>
        <div className={styles.textDiv}>
          <h3 className={styles.textHeading}>Affordabilty</h3>
          <p className={styles.adText}>
            Our prices are affordable as they are reasonably calculated. We
            strive to maintain the efficiency of our services without charging a
            lot of money. There are also different categories of services meant
            to ensure affordabilty
          </p>
        </div>
        <img className={styles.adImg} src={affordable} />
      </div>

      <div className={styles.ad}>
        <img className={styles.adImg} src={track} />
        <div className={styles.textDiv}>
          <h3 className={styles.textHeading}>Tracking</h3>
          <p className={styles.adText}>
            you can track the progress of your delivery anytime you want. This
            is an initiative to maintain accountability while also keeping you
            in the know of the delivery progress.
          </p>
        </div>
      </div>

      <div className={styles.ad}>
        <div className={styles.textDiv}>
          <h3 className={styles.textHeading}>Safety</h3>
          <p className={styles.adText}>
            Our security is paramount for we Value the safety of your cargo. We
            take well evaluated security measures to ensure your goods remain
            safe. Our security is not limited to protection against
            theft/roberry but it also covers other risks like protecting
            perishable goods and safe-guarding fragile luggage
          </p>
        </div>
        <img className={styles.adImg} src={security} />
      </div>

      <div className={styles.copyright}>
        <label className={styles.copyright1}>@copyright Send It </label>
        <label className={styles.copyright2}> all rights reserved</label>
      </div>
    </main>
  );
}

export default Home;
