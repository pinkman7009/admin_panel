import React from "react";
import { BsPlusLg } from "react-icons/bs";
import "../../../styles/Buttons.css";

const AddButton = ({ resource, handleClick }) => {
  return (
    <button className="add-button" onClick={handleClick}>
      <BsPlusLg />
      Add {resource}
    </button>
  );
};

export default AddButton;
