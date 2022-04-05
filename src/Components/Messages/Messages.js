import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

import { AiOutlineSearch } from "react-icons/ai";
import { FaUpload } from "react-icons/fa";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { IoMdMailOpen } from "react-icons/io";

import ViewMessage from "../ViewMessage/ViewMessage";

import swal from "sweetalert";

import styles from "./Messages.module.css";
import {
  getMessages,
  resetGetMessages,
  updateMessage,
} from "../../Redux/Actions/MessageActions";

function Messages(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getMessagesState = useSelector((state) => state.message.getMessages);
  const utils = useSelector((state) => state.utils);
  const { user } = useSelector((state) => state.user);

  const [messagesData, setMessagesData] = useState({
    search: "",
    size: 10,
    page: 1,
  });

  const [currentMessage, setCurrentMessage] = useState({});
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    dispatch(getMessages(messagesData));
  }, [messagesData]);

  useEffect(() => {
    const { error, loading, status } = getMessagesState;
    if (!status && !loading) {
      if (error == "There is no more data") {
        setMessagesData((prev) => ({
          ...prev,
          page: messagesData.page - 1,
        }));
      } else if (error != "") {
        swal({
          icon: "error",
          text: error,
        });
      }
    }
  }, [getMessagesState]);

  useEffect(() => {
    return () => {
      dispatch(resetGetMessages());
    };
  }, []);

  function handleChange(e) {
    setMessagesData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const debouncedSearch = debounce(async (e) => {
    handleChange(e);
  }, 300);

  return (
    <div className={styles.main}>
      {showMessage && (
        <ViewMessage
          setShowMessage={setShowMessage}
          message={currentMessage}
          messagesData={messagesData}
        />
      )}

      <div className={styles.actions}>
        <h1 className={styles.heading}>Messages</h1>

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
            onClick={() => dispatch(getMessages(messagesData))}
          />
        </div>
      </div>

      <div className={styles.cont}>
        <table className={styles.table}>
          <tr className={styles.tableHead}>
            <th className={styles.tableHeader}>No</th>
            <th className={styles.tableHeader}>Sender Name</th>
            <th className={styles.tableHeader}>Sender Email</th>
            <th className={styles.tableHeader}>Date</th>
            <th className={styles.tableHeader}>Time</th>
            <th className={styles.tableHeaderIcon}>Open</th>
          </tr>
          {getMessagesState.messages.map((message, id) => {
            return (
              <tr
                className={
                  message.isRead == "false"
                    ? styles.tableRowOdd
                    : styles.tableRowEven
                }
                id={id}
              >
                <td className={styles.tableData}>
                  {(messagesData.page - 1) * messagesData.size + id + 1}
                </td>

                <td className={styles.tableData}>{message.name} </td>

                <td className={styles.tableData}>{message.email}</td>

                <td className={styles.tableData}>
                  {moment(message.date).format("YYYY-MM-DD")}
                </td>

                <td className={styles.tableData}>
                  {moment(message.date).format("hh:mm")}
                </td>

                <td className={styles.tableIcon}>
                  <IoMdMailOpen
                    className={styles.openIcon}
                    size={21}
                    onClick={() => {
                      setCurrentMessage(message);
                      setShowMessage(true);
                      dispatch(
                        updateMessage({ id: message.id, isRead: "true" })
                      );
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
              if (messagesData.page > 1) {
                setMessagesData((prev) => ({
                  ...prev,
                  page: messagesData.page - 1,
                }));
              }
            }}
          >
            <GrLinkPrevious className={styles.pageIcon} size={28} />
            <label className={styles.pageLabel}> Prev</label>
          </div>

          <div className={styles.pageText}>Page {messagesData.page}</div>

          <div
            className={styles.pageDiv}
            onClick={() =>
              setMessagesData((prev) => ({
                ...prev,
                page: messagesData.page + 1,
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

export default Messages;
