import React from "react";
import "../../../styles/Buttons.css";

const ViewButton = ({ text, handleClick, className }) => {
  return (
    <button className={`view-button ${className}`} onClick={handleClick}>
      {text}
    </button>
  );
};

export default ViewButton;
