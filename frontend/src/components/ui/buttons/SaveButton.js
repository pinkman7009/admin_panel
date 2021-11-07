import React from "react";
import "../../../styles/Buttons.css";

const SaveButton = ({ handleClick }) => {
  return (
    <button className="save-button" onClick={handleClick}>
      Save
    </button>
  );
};

export default SaveButton;
