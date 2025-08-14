import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import { useLocation } from "react-router-dom";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

const ENDPOINT = "http://localhost:5000"; // ✅ moved outside

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const location = useLocation();


  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    // Listen for messages
    socket.on("message", (message) => {
      setMessages((msgs) => [...msgs, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    // Listen for file messages
    socket.on("file", (fileMsg) => {
      setMessages((msgs) => [...msgs, fileMsg]);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [location.search]);



  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  // Add file sending support
  const sendFile = (fileObj) => {
    socket.emit('sendFile', fileObj);
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} users={users}/>
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} sendFile={sendFile} />
      </div>
    </div>
  );
};

export default Chat;
