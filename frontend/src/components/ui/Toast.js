import React from "react";
import "../../styles/Modal.css";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../types/modalTypes";
import ViewButton from "./buttons/ViewButton";
import DeleteButton from "./buttons/DeleteButton";
import { GrClose } from "react-icons/gr";

const Modal = ({ title, handleClick }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL, payload: null });
  };
  return (
    <div className="toast-container">
      <div className="toast-wrapper">
        <GrClose onClick={closeModal} />
        <h3 className="toast-title">Are you sure you want to {title}?</h3>
        <div className="button-group">
          <ViewButton text="Yes" handleClick={handleClick} />
          <DeleteButton text="Cancel" handleClick={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
