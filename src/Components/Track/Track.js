import GoogleMapReact from "google-map-react";
import { useEffect } from "react";

import styles from "./Track.module.css";

function Track(props) {
  function apiIsLoaded(map, maps) {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    const origin = { lat: 0.5167, lng: 35.2833 };
    const destination = { lat: -0.4167, lng: 36.95 };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  return (
    <div className={styles.track}>
      <label>Track</label>

      <div className={styles.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={{
            lat: -0.4167,
            lng: 36.95,
          }}
          defaultZoom={7}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
        ></GoogleMapReact>
      </div>
    </div>
  );
}

export default Track;
