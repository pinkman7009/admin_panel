import React from "react";
import "../../../styles/News.css";
import AddButton from "../buttons/AddButton";
import NewsList from "./NewsList";
import { useNavigate } from "react-router-dom";

const NewsSection = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/news/modal");
  };
  return (
    <div className="news-container">
      <div className="news-header">
        <h3>News</h3>
        <AddButton resource="News" handleClick={handleClick} />
      </div>
      <NewsList />
    </div>
  );
};

export default NewsSection;
