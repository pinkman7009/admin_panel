import React from "react";
import "../../styles/Modal.css";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../types/modalTypes";

const Modal = ({ title, body }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL, payload: null });
  };
  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <div onClick={closeModal} style={{ cursor: "pointer" }}>
          <GrClose />
        </div>
        <h3 className="modal-title">{title}</h3>
        {body}
      </div>
    </div>
  );
};

export default Modal;
