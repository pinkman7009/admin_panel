import React, { useState } from "react";
import "../../../styles/Modal.css";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../../types/modalTypes";
import ViewButton from "../buttons/ViewButton";
import { register, addRole } from "../../../actions/registerAction";
import SaveButton from "../buttons/SaveButton";
import { useNavigate } from "react-router-dom";

const AccessModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const [roleType, setRoleType] = useState("0");

  const { firstname, lastname, email, password, roleTitle } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.role = 0;
    dispatch(addRole(form));
    dispatch({ type: CLOSE_MODAL });
    navigate("/access");
  };

  const closeModal = () => {
    // dispatch({ type: CLOSE_MODAL, payload: null });
    navigate("/access");
  };
  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <ViewButton handleClick={closeModal} text="Go Back" />
        <h3 className="modal-title">Add Role</h3>
        <input
          name="firstname"
          type="text"
          placeholder="Enter first name"
          className="modal-input"
          value={firstname}
          onChange={handleChange}
        />
        <input
          name="lastname"
          type="text"
          placeholder="Enter last name"
          className="modal-input"
          value={lastname}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          className="modal-input"
          value={email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          className="modal-input"
          value={password}
          onChange={handleChange}
        />
        <input
          name="roleTitle"
          type="text"
          placeholder="Enter Role Title"
          className="modal-input"
          value={roleTitle}
          onChange={handleChange}
        />

        {roleType === "0" ? (
          <div className="admin-access-options">
            <div className="checkbox-group">
              <label htmlFor="">Manage Access</label>
              <input type="checkbox" />
            </div>
            <div className="checkbox-group">
              <label htmlFor="">Categories</label>
              <input type="checkbox" />
            </div>
            <div className="checkbox-group">
              <label htmlFor="">News</label>
              <input type="checkbox" />
            </div>
            <div className="checkbox-group">
              <label htmlFor="">Customer Details</label>
              <input type="checkbox" />
            </div>
            <div className="checkbox-group">
              <label htmlFor="">Memberships</label>
              <input type="checkbox" />
            </div>
          </div>
        ) : null}

        <SaveButton handleClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AccessModal;
