import React from "react";
import "../../../styles/ManageAccess.css";
import AddButton from "../buttons/AddButton";
import SaveButton from "../buttons/SaveButton";
import RoleList from "./RoleList";
import { useDispatch } from "react-redux";
import { OPEN_MODAL } from "../../../types/modalTypes";

const ManageAccessSection = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const modalBody = () => {
    return (
      <>
        <input type="text" placeholder="Enter name" className="modal-input" />
        <input type="email" placeholder="Enter email" className="modal-input" />
        <input
          type="password"
          placeholder="Enter password"
          className="modal-input"
        />

        <SaveButton handleClick={handleSubmit} />
      </>
    );
  };

  const handleClick = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: { title: "Add Role", body: modalBody },
    });
  };
  return (
    <div className="access-container">
      <div className="access-section">
        <div className="access-section-header">
          <h3>All Roles</h3>
          <AddButton resource="Role" handleClick={handleClick} />
        </div>
        <RoleList />
      </div>
    </div>
  );
};

export default ManageAccessSection;
