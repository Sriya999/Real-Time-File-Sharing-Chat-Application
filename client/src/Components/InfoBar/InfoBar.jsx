import React from "react";

import './InfoBar.css';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';
import TextContainer from "../TextContainer/TextContainer";


const InfoBar = ({ room,users }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="Online" />
      <h3>{room}</h3>
    </div>

    <div className="rightInnerContainer">
      <a href="/">
        <img src={closeIcon} alt="close" />
      </a>
    </div>
    <TextContainer users={users}/>
  </div>
);

export default InfoBar;
