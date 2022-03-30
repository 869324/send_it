import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Track.module.css";
import { changePanel } from "../../Redux/Actions/UtilsActions";
import { getParcel, resetGetParcel } from "../../Redux/Actions/ParcelActions";

function Track(props) {
  const dispatch = useDispatch();

  const { trackId, stations } = useSelector((state) => state.utils);
  const getParcelInfo = useSelector((state) => state.parcels.getParcel);

  const [from, setFrom] = useState({});
  const [to, setTo] = useState({});
  const [current, setCurrent] = useState({});

  useEffect(() => {
    dispatch(changePanel("/user/parcels/trackDeliveries"));
  }, []);

  useEffect(() => {
    dispatch(getParcel(trackId));
  }, [trackId]);

  useEffect(() => {
    const { status, error, loading, parcel } = getParcelInfo;
    if (status) {
      const start_location = stations.find(
        (station) => station.id == parcel.start_location
      );
      const end_location = stations.find(
        (station) => station.id == parcel.end_location
      );

      const current_location = stations.find(
        (station) => station.id == parcel.current_location
      );

      setFrom({
        lng: parseFloat(start_location.lng),
        lat: parseFloat(start_location.lat),
        name: start_location.name,
      });

      setTo({
        lng: parseFloat(end_location.lng),
        lat: parseFloat(end_location.lat),
        name: end_location.name,
      });

      try {
        setCurrent({
          lng: parseFloat(current_location.lng),
          lat: parseFloat(current_location.lat),
        });
      } catch (error) {
        console.log(error);
      }
    } else if (error != "" && !loading) {
      console.log(error);
    }
  }, [getParcelInfo]);

  useEffect(() => {
    return () => {
      dispatch(resetGetParcel());
    };
  }, []);

  function renderMarkers(map, maps) {
    let marker = new maps.Marker({
      position: from,
      map,
      title: "From",
    });

    let marker1 = new maps.Marker({
      position: to,
      map,
      title: "Destination",
    });

    if (Object.keys(current).length > 0) {
      let marker2 = new maps.Marker({
        position: current,
        map,
        title: "Current Location",
      });
    }
  }

  return (
    <div className={styles.track}>
      <div className={styles.info}>
        <div className={styles.trackInfo}>
          <label className={styles.infoLabel}>Tracking</label>
          <label className={styles.infoValue}>
            {getParcelInfo.parcel.description}
          </label>
        </div>

        <div className={styles.trackInfo}>
          <label className={styles.infoLabel}>From</label>
          <label className={styles.infoValue}>{from.name}</label>
        </div>

        <div className={styles.trackInfo}>
          <label className={styles.infoLabel}>To</label>
          <label className={styles.infoValue}>{to.name}</label>
        </div>
      </div>

      <div className={styles.map}>
        {Object.keys(from).length > 0 && (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDvLec-HtdGShd-joZxCb_w45NUlhV0MnI",
            }}
            defaultCenter={{
              lat: -0.4167,
              lng: 36.95,
            }}
            defaultZoom={7}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) =>
              renderMarkers(map, maps, from, to)
            }
          ></GoogleMapReact>
        )}
      </div>
    </div>
  );
}

export default Track;
