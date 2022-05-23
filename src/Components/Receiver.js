import React, { useState } from "react";
import socket from "./Helper";
import download from "downloadjs";
const Receiver = () => {
  const [sender_uid, setsenderId] = useState("");
  const [showId, setshowId] = useState(false);
  function generateID() {
    return `${Math.trunc(Math.random() * 999)}-${Math.trunc(
      Math.random() * 999
    )}-${Math.trunc(Math.random() * 999)}`;
  }

  const onConnection = () => {
    if (sender_uid.length === 0) {
      window.alert("Please enter sender id");  
      return;
    }
    let joinID = generateID();
    socket.emit("receiver-join", {
      sender_uid: sender_uid,
      uid: joinID,
    });
    document.querySelector(".join-screen").classList.remove("active");
    document.querySelector(".fs-screen").classList.add("active");
    window.alert("You are connected to sender");
    setshowId(true);
    let fileShare = {};

    socket.on("fs-meta", function (metadata) {
      fileShare.metadata = metadata;
      fileShare.transmitted = 0;
      fileShare.buffer = [];

      let el = document.createElement("div");
      el.classList.add("item");
      el.innerHTML = `
                            <div class="progress">0%</div>
                            <div class="filename">${metadata.filename}</div>
                    `;
      document.querySelector(".files-list").appendChild(el);

      fileShare.progrss_node = el.querySelector(".progress");

      socket.emit("fs-start", {
        uid: sender_uid,
      });
    });

    socket.on("fs-share", function (buffer) {
      fileShare.buffer.push(buffer);
      fileShare.transmitted += buffer.byteLength;
      fileShare.progrss_node.innerText = Math.trunc(
        (fileShare.transmitted / fileShare.metadata.total_buffer_size) * 100
      );
      if (fileShare.transmitted === fileShare.metadata.total_buffer_size) {
        console.log("Download file: ", fileShare);
        download(new Blob(fileShare.buffer), fileShare.metadata.filename);
        fileShare = {};
      } else {
        socket.emit("fs-start", {
          uid: sender_uid,
        });
      }
    });
  };

  return (
    <div className="app">
      <div className="screen join-screen active">
        <div className="form">
          <h2>Share your files securely</h2>
          <div className="form-input">
            <label>Join ID</label>
            <input
              type="text"
              id="join-id"
              onChange={(e) => setsenderId(e.target.value)}
            />
          </div>
          {!showId && <div className="form-input">
            <button id="receiver-start-con-btn" onClick={onConnection}>
              Connect
            </button>
          </div>}
        </div>
      </div>
      <div className="screen fs-screen">
        <div className="files-list">
          <div className="title">Shared files</div>
        </div>
      </div>
    </div>
  );
};

export default Receiver;
