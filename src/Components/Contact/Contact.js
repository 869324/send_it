import { useState } from "react";

import styles from "./Contact.module.css";

import { BsFillTelephoneOutboundFill, BsTwitter } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import axios from "axios";
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Fullname"
            />
          </div>

          <div className={styles.inputDiv}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </div>

          <div className={styles.textDiv}>
            <label className={styles.label}>Message</label>
            <textarea
              className={styles.textarea}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
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
