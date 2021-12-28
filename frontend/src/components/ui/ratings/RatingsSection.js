import React from "react";
import "../../../styles/News.css";
import RatingsList from "./RatingsList";

const RatingsSection = () => {
  return (
    <div className="news-container">
      <div className="news-header">
        <h3>Ratings</h3>
      </div>
      <RatingsList />
    </div>
  );
};

export default RatingsSection;
