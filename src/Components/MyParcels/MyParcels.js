import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";

import { AiOutlineSearch } from "react-icons/ai";
import { FaUpload } from "react-icons/fa";
import { MdDelete, MdLocationOn } from "react-icons/md";

import styles from "./MyParcels.module.css";
import UserParcelEditor from "../UserParcelEditor/UserParcelEditor";

import { setParcels } from "../../Redux/Actions/ParcelActions";
import { setTrackId } from "../../Redux/Actions/StatesActions";
import { changePanel } from "../../Redux/Actions/StatesActions";
import swal from "sweetalert";

function MyParcels(props) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const parcels = useSelector((state) => state.parcels);
  const states = useSelector((state) => state.states);
  const user = useSelector((state) => state.user);

  const [order, setOrder] = useState("date desc");
  const [search, setSearch] = useState("");
  const [parcelEdit, setParcel] = useState({});
  const [showEditor, setShowEditor] = useState(false);
  const size = 20;

  useEffect(() => {
    fetchParcels();
  }, []);

  function fetchParcels(sort = order) {
    axios
      .post(`http://localhost:8000/parcels/getParcels`, {
        page: page,
        user: user.id,
        order: sort,
        search: search,
        size: size,
      })
      .then((res) => {
        dispatch(setParcels(res.data.parcels));
      });
  }

  function cancelOrder(id, isSent) {
    if (isSent == "true") {
      swal({
        icon: "warning",
        text: "You cannot cancel this order because the parcel is enroute",
      });
    } else {
      swal({
        icon: "warning",
        title: "Confirm cancelation",
        text: `Are you sure you want to cancel this order?`,
        buttons: ["No", "Yes"],
        dangerMode: true,
      }).then((isConfirm) => {
        if (isConfirm) {
          axios
            .delete(`http://localhost:8000/parcels/deleteParcel/${id}`)
            .then((res) => {
              if (res.data.status) {
                fetchParcels();
                swal({
                  icon: "success",
                  text: "Order has been canceled",
                });
              } else {
                swal({
                  icon: "error",
                  text: "Order could not be canceled, try again later",
                });
              }
            });
        }
      });
    }
  }

  return (
    <div className={styles.main}>
      {showEditor && (
        <UserParcelEditor
          setShowEditor={setShowEditor}
          parcel={parcelEdit}
          fetchParcels={fetchParcels}
          order={order}
        />
      )}

      <div className={styles.actions}>
        <div className={styles.searchDiv}>
          <input
            className={styles.search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search"
          />
          <AiOutlineSearch
            className={styles.searchIcon}
            size={28}
            onClick={() => fetchParcels(order)}
          />
        </div>

        <h1 className={styles.heading}>Delivery Orders</h1>

        <div className={styles.sortDiv}>
          <label className={styles.sortText}>Sort</label>
          <select
            className={styles.sort}
            name="sort"
            onChange={(e) => {
              e.preventDefault();
              setOrder(e.target.value);
              fetchParcels(e.target.value);
            }}
          >
            <option value={"date desc"}>Date Desc</option>
            <option value={"date asc"}>Date Asc</option>
            <option value={"desc asc"}>Description Asc</option>
            <option value={"desc desc"}>Description Desc</option>
          </select>
        </div>
      </div>

      <div className={styles.cont}>
        <table className={styles.table}>
          <tr className={styles.tableHead}>
            <th className={styles.tableHeader}>No</th>
            <th className={styles.tableHeader}>Description</th>
            <th className={styles.tableHeader}>From</th>
            <th className={styles.tableHeader}>To</th>
            <th className={styles.tableHeader}>Receiver</th>
            <th className={styles.tableHeader}>Date</th>
            <th className={styles.tableHeader}>Status</th>
            <th className={styles.tableHeaderIcon}>Track</th>
            <th className={styles.tableHeaderIcon}>Update</th>
            <th className={styles.tableHeaderIcon}>Cancel</th>
          </tr>
          {parcels.map((parcel, id) => {
            return (
              <tr
                className={
                  (id + 1) % 2 > 0 ? styles.tableRowOdd : styles.tableRowEven
                }
              >
                <td className={styles.tableData}>{id + 1} </td>

                <td className={styles.tableData}>{parcel.description} </td>

                <td className={styles.tableData}>
                  {
                    states.stations.find(
                      (station) => station.id == parcel.start_location
                    ).name
                  }
                </td>

                <td className={styles.tableData}>
                  {
                    states.stations.find(
                      (station) => station.id == parcel.end_location
                    ).name
                  }
                </td>

                <td className={styles.tableData}>
                  {`+254${parcel.receiver_number}`}
                </td>

                <td className={styles.tableData}>
                  {moment(parcel.date_created, "YYYY-MM-DDTHH:mm:ss.0Z").format(
                    "YYYY-MM-DD HH:mm"
                  )}
                </td>

                <td className={styles.tableData}>
                  {parcel.isDelivered == "true"
                    ? "Delivered"
                    : parcel.isSent == "true"
                    ? "Enroute"
                    : "Not Sent"}
                </td>

                <td className={styles.tableIcon}>
                  <MdLocationOn
                    className={styles.trackIcon}
                    size={21}
                    onClick={() => {
                      dispatch(setTrackId(parcel.id));
                      dispatch(changePanel("trackDelivery"));
                    }}
                  />
                </td>

                <td className={styles.tableIcon}>
                  <FaUpload
                    className={styles.updateIcon}
                    size={21}
                    onClick={() => {
                      setParcel(parcel);
                      setShowEditor(true);
                    }}
                  />
                </td>

                <td className={styles.tableIcon}>
                  <MdDelete
                    className={styles.cancelIcon}
                    size={21}
                    onClick={() => cancelOrder(parcel.id, parcel.isSent)}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default MyParcels;
