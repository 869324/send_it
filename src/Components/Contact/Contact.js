import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Contact.module.css";

import { BsFillTelephoneOutboundFill, BsTwitter } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import axios from "axios";
import swal from "sweetalert";
import {
  sendMessage,
  resetSendMessage,
} from "../../Redux/Actions/MessageActions";

function Contact(props) {
  const dispatch = useDispatch();

  const sendMessageState = useSelector((state) => state.message.send);

  const [messageData, setMessageData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const { error, loading, status } = sendMessageState;
    if (loading) {
      swal({
        text: "Loading ...",
      });
    } else if (status) {
      swal({
        icon: "success",
        text: "Message has been sent",
      });
      setMessageData((prev) => ({ ...prev, name: "", email: "", message: "" }));
    } else if (error != "") {
      swal({
        icons: "error",
        text: error,
      });
    }
  }, [sendMessageState]);

  useEffect(() => {
    return () => {
      dispatch(resetSendMessage());
    };
  }, []);

  function handleChange(e) {
    setMessageData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    dispatch(sendMessage(messageData));
  }
  return (
    <div className={styles.main}>
      <div className={styles.cont}>
        <div className={styles.text}>
          <h2 className={styles.heading}>Get in touch with us</h2>

          <p className={styles.desc}>
            Feel free to contact us about your enquiries, our services, our
            customer service and pretty much anything else you need
          </p>

          <div className={styles.contacts}>
            <div className={styles.contact}>
              <BsFillTelephoneOutboundFill className={styles.phone} size={28} />
              <label className={styles.value}>+2547 888 888 88</label>
            </div>

            <div className={styles.contact}>
              <MdEmail className={styles.email} size={28} />
              <label className={styles.value}>sendit@gmail.com</label>
            </div>

            <div className={styles.contact}>
              <BsTwitter className={styles.twitter} size={28} />
              <label className={styles.value}>@send_it</label>
            </div>
          </div>
        </div>

        <form className={styles.form} onSubmit={submit}>
          <h2 className={styles.heading}>Contact Us</h2>
          <div className={styles.inputDiv}>
            <label className={styles.label}>Fullname</label>
            <input
              className={styles.input}
              value={messageData.name}
              name="name"
              onChange={handleChange}
              placeholder="Fullname"
            />
          </div>

          <div className={styles.inputDiv}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={messageData.email}
              name="email"
              onChange={handleChange}
              placeholder="Email address"
            />
          </div>

          <div className={styles.textDiv}>
            <label className={styles.label}>Message</label>
            <textarea
              className={styles.textarea}
              value={messageData.message}
              name="message"
              onChange={handleChange}
              placeholder="Type message ..."
            />
          </div>

          <button className={styles.submit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
