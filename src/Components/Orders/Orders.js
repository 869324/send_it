import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

import { AiOutlineSearch } from "react-icons/ai";
import { FaUpload } from "react-icons/fa";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

import AdminEditParcel from "../AdminEditParcels/AdminEditParcels";
import styles from "./Orders.module.css";

import { getParcels, resetGetParcels } from "../../Redux/Actions/ParcelActions";
import swal from "sweetalert";

function Orders(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getParcelState = useSelector((state) => state.parcels.get);
  const utils = useSelector((state) => state.utils);
  const { user } = useSelector((state) => state.user);

  //console.log(getParcelState);

  const [parcelsData, setParcelsData] = useState({
    order: "date desc",
    search: "",
    size: 10,
    page: 1,
  });

  const [parcelEdit, setParcel] = useState({});
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    dispatch(getParcels(parcelsData));
  }, [parcelsData]);

  useEffect(() => {
    const { error, loading, status } = getParcelState;
    if (!status && !loading) {
      if (error == "There is no more data") {
        setParcelsData((prev) => ({
          ...prev,
          page: parcelsData.page - 1,
        }));
      } else if (error != "") {
        swal({
          icon: "error",
          text: error,
        });
      }
    }
  }, [getParcelState]);

  useEffect(() => {
    return () => {
      dispatch(resetGetParcels());
    };
  }, []);

  function handleChange(e) {
    setParcelsData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const debouncedSearch = debounce(async (e) => {
    handleChange(e);
  }, 300);

  return (
    <div className={styles.main}>
      {showEditor && (
        <AdminEditParcel
          setShowEditor={setShowEditor}
          parcel={parcelEdit}
          parcelsData={parcelsData}
        />
      )}

      <div className={styles.actions}>
        <div className={styles.searchDiv}>
          <input
            className={styles.search}
            name="search"
            onChange={debouncedSearch}
            placeholder="Search"
          />
          <AiOutlineSearch
            className={styles.searchIcon}
            size={28}
            onClick={() => dispatch(getParcels(parcelsData))}
          />
        </div>

        <h1 className={styles.heading}>Delivery Orders</h1>

        <div className={styles.sortDiv}>
          <label className={styles.sortText}>Sort</label>
          <select className={styles.sort} name="order" onChange={handleChange}>
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
            <th className={styles.tableHeaderIcon}>Update</th>
          </tr>
          {getParcelState.parcels.map((parcel, id) => {
            return (
              <tr
                className={
                  (id + 1) % 2 > 0 ? styles.tableRowOdd : styles.tableRowEven
                }
              >
                <td className={styles.tableData}>
                  {(parcelsData.page - 1) * parcelsData.size + id + 1}
                </td>

                <td className={styles.tableData}>{parcel.description} </td>

                <td className={styles.tableData}>
                  {
                    utils.stations.find(
                      (station) => station.id == parcel.start_location
                    ).name
                  }
                </td>

                <td className={styles.tableData}>
                  {
                    utils.stations.find(
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
                  <FaUpload
                    className={styles.updateIcon}
                    size={21}
                    onClick={() => {
                      setParcel(parcel);
                      setShowEditor(true);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </table>

        <div className={styles.pagination}>
          <div
            className={styles.pageDiv}
            onClick={() => {
              if (parcelsData.page > 1) {
                setParcelsData((prev) => ({
                  ...prev,
                  page: parcelsData.page - 1,
                }));
              }
            }}
          >
            <GrLinkPrevious className={styles.pageIcon} size={28} />
            <label className={styles.pageLabel}> Prev</label>
          </div>

          <div className={styles.pageText}>Page {parcelsData.page}</div>

          <div
            className={styles.pageDiv}
            onClick={() =>
              setParcelsData((prev) => ({
                ...prev,
                page: parcelsData.page + 1,
              }))
            }
          >
            <label className={styles.pageLabel}> Next</label>
            <GrLinkNext className={styles.pageIcon} size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
