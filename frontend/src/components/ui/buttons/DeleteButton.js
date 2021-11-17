import React from "react";
import "../../../styles/Buttons.css";

const DeleteButton = ({ text, handleClick }) => {
  return (
    <button className="delete-button" onClick={handleClick}>
      {text}
    </button>
  );
};

export default DeleteButton;
