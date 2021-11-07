import React from "react";
import "../../styles/Modal.css";
import { GrClose } from "react-icons/gr";

const Modal = ({ title, body }) => {
  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <GrClose />
        <h3>This is the title</h3>
        {/* {body()} */}
        <h3>Hello</h3>
      </div>
    </div>
  );
};

export default Modal;
