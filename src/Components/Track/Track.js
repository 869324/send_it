import GoogleMapReact from "google-map-react";
import { useEffect } from "react";

import styles from "./Track.module.css";

function Track(props) {
  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization&callback=initMap";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <div className={styles.track}>
      <h1>Track</h1>

      <div className={styles.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={{
            lat: 59.955413,
            lng: 30.337844,
          }}
          defaultZoom={4}
        ></GoogleMapReact>
      </div>
    </div>
  );
}

export default Track;
