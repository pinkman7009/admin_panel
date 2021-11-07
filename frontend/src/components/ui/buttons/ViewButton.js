import React from "react";
import "../../../styles/Buttons.css";

const ViewButton = ({ handleClick }) => {
  return (
    <button className="view-button" onClick={handleClick}>
      View
    </button>
  );
};

export default ViewButton;
