import React, { useState, useEffect } from "react";
import "../../../styles/Channels.css";

import { useDispatch, useSelector } from "react-redux";

import ChannelsList from "./ChannelsList";

import { useNavigate } from "react-router-dom";

const ChannelsSection = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const state = useSelector((state) => state);

  //   useEffect(() => {
  //     if (!state.channels) dispatch(fetchChannels());
  //   }, []);

  return (
    <div className="channels-container">
      <div className="channels-list">
        <div className="channels-list-header">
          <h3>Channels</h3>
        </div>

        <ChannelsList channels={state.channels} />
      </div>
    </div>
  );
};

export default ChannelsSection;
