import React, { useState, useEffect } from "react";
import "./Home.css";
import socket from "./Helper";
const Sender = () => {
  const [roomId, setroomId] = useState("000-000-000");
  const [show, setshow] = useState(false);
  let receiverID;
  const generateRoomId = () => {
    let Id =
      Math.trunc(Math.random() * 999) +
      "-" +
      Math.trunc(Math.random() * 999) +
      "-" +
      Math.trunc(Math.random() * 999);
    setroomId(Id);
  };

  socket.on("init", function (uid) {
    receiverID = uid;
  });

  useEffect(() => {
    generateRoomId();
  }, []);
  const createRoom = () => {
    setshow(!show);
    socket.emit("sender-join", {
      uid: roomId,
    });
  };
  const setFile = (e) => {
    let file = e.target.files[0];
    console.log(file);
    if (!file) {
      return;
    }
    let reader = new FileReader();

    reader.onload = function (e) {
      let buffer = new Uint8Array(reader.result);
      let el = document.createElement("div");
      el.classList.add("item");
      el.innerHTML = `
					<div class="progress">0%</div>
					<div class="filename">${file.name}</div>
			`;
      document.querySelector(".files-list").appendChild(el);
      shareFile(
        {
          filename: file.name,
          total_buffer_size: buffer.length,
          buffer_size: 1024,
        },
        buffer,
        el.querySelector(".progress")
      );
    };
    reader.readAsArrayBuffer(file);
  };

  function shareFile(metadata, buffer, progress_node) {
    console.log(buffer);
    socket.emit("file-meta", {
      uid: receiverID,
      metadata: metadata,
    });

    socket.on("fs-share", function () {
      let chunk = buffer.slice(0, metadata.buffer_size);
      buffer = buffer.slice(metadata.buffer_size, buffer.length);
      progress_node.innerText = Math.trunc(
        ((metadata.total_buffer_size - buffer.length) /
          metadata.total_buffer_size) *
          100
      );
      if (chunk.length !== 0) {
        socket.emit("file-raw", {
          uid: receiverID,
          buffer: chunk,
        });
      }
    });
  }
  return (
    <>
      <div className="app">
        <div className="screen join-screen active">
          <div className="form">
            <h2>Share your files securely</h2>
            {!show && (
              <div className="form-input">
                <button id="sender-start-con-btn" onClick={createRoom}>
                  Create share room
                </button>
              </div>
            )}
            {show && (
              <div id="roomId">
                <b>Room ID</b> <span id="join-id">{roomId}</span>{" "}
              </div>
            )}
            <br />
          </div>
        </div>
      </div>
      {show && (
        <div className="screen fs-screen">
          <div className="file-input">
            <label for="file-input">
              Click here to Select files for sharing{" "}
              <input type="file" id="file-input" onChange={setFile} />
            </label>
          </div>
          <div className="files-list">
            <div className="title">Shared files</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sender;
