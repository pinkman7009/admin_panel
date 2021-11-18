import React from "react";
import "../../styles/Modal.css";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../types/modalTypes";
import ViewButton from "./buttons/ViewButton";

const Modal = ({ title, body }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL, payload: null });
  };
  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <ViewButton handleClick={closeModal} text="Go Back" />
        <h3 className="modal-title">{title}</h3>
        {body}
      </div>
    </div>
  );
};

export default Modal;
