import { useState } from "react";

import styles from "./Contact.module.css";

import pic from "../../assets/images/Domestic-delivery.png";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import swal from "sweetalert";

function Contact(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  function submit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:8000/messages/addMessage", {
        name: name,
        email: email,
        message: msg,
      })
      .then((res) => {
        if (res.data.status) {
          swal({
            icon: "success",
            text: "Message sent",
          });

          setName("");
          setEmail("");
          setMsg("");
        } else {
          swal({
            icon: "error",
            text: "Message not sent. Try agin later",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className={styles.main}>
      <h2 className={styles.heading}>Shoot us a message</h2>
      <p className={styles.p}>
        You can contact us by using the form below. We make sure to<br></br>{" "}
        respond as fast as possible
      </p>

      <div className={styles.cont}>
        <img className={styles.pic} src={pic} />

        <form className={styles.form} onSubmit={submit}>
          <div className={styles.inputDiv}>
            <label className={styles.label}>Fullname</label>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.inputDiv}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.textDiv}>
            <label className={styles.label}>Message</label>
            <textarea
              className={styles.textarea}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </div>

          <button className={styles.submit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
