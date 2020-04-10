import React from "react";
import axios from "axios";
import useModal from "react-hooks-use-modal";
import "./message.css";

function Message() {
  const [Modal, openModal, close] = useModal("root", {
    preventScroll: true
  });

  const sendMessage = type => {
    const URL = process.env.REACT_APP_API_URL + `sms/${type}`;
    const AUTH_STR = process.env.REACT_APP_API_AUTH;
    axios
      .get(URL, {
        headers: {
          Authorization: AUTH_STR
        }
      })
      .then(response => {
        console.log(response);
        openModal();
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  };

  return (
    <div className="message">
      <button className="sms-button" onClick={() => sendMessage("dinner")}>
        Dinner is ready{" "}
        <span role="img" aria-label="spagetti">
          🍝
        </span>
      </button>
      <button className="sms-button" onClick={() => sendMessage("ishome")}>
        Just got home{" "}
        <span role="img" aria-label="house">
          🏠
        </span>
      </button>
      <button className="sms-button" onClick={() => sendMessage("comehome")}>
        Come home{" "}
        <span role="img" aria-label="walk">
          🚶
        </span>
        ‍
      </button>
      <Modal>
        <div className="modal">
          <h1>Message is sent!</h1>
          <p>You have now sent SMS to everyone in the family.</p>
          <button onClick={close}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default Message;
