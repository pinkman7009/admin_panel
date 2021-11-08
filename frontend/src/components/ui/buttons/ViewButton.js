import React from "react";
import "../../../styles/Buttons.css";

const ViewButton = ({ text, handleClick }) => {
  return (
    <button className="view-button" onClick={handleClick}>
      {text}
    </button>
  );
};

export default ViewButton;
