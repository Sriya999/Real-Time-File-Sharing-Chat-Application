import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (name && room) {
      navigate(`/chat?name=${name}&room=${room}`);
    } else {
      alert("Please enter both name and room.");
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <input
          placeholder="Name"
          className="joinInput"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Room"
          className="joinInput mt-20"
          type="text"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button className="button mt-20" onClick={handleJoin}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Join;
