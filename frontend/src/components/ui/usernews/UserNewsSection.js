import React, { useState } from "react";
import "../../../styles/News.css";
import AddButton from "../buttons/AddButton";
import SaveButton from "../buttons/SaveButton";
import { useDispatch } from "react-redux";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../types/modalTypes";
import UserNewsList from "./UserNewsList";
import { useNavigate } from "react-router-dom";

const UserNewsSection = () => {
  const dispatch = useDispatch();

  return (
    <div className="news-container">
      <div className="news-header">
        <h3>Users News</h3>
      </div>
      <UserNewsList />
    </div>
  );
};

export default UserNewsSection;
