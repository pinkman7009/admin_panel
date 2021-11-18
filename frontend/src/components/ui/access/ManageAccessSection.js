import React, { useState, useEffect } from "react";
import "../../../styles/ManageAccess.css";
import AddButton from "../buttons/AddButton";
import SaveButton from "../buttons/SaveButton";
import RoleList from "./RoleList";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL, OPEN_MODAL } from "../../../types/modalTypes";
import { register, addRole } from "../../../actions/registerAction";
import { getUsers } from "../../../actions/roleAction";

const ModalBody = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({});

  const [roleType, setRoleType] = useState("0");

  const { firstname, lastname, email, password, role } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e) => {
    console.log(e.target.value);
    setRoleType(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRole(form));
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <>
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
        value={role}
        onChange={handleChange}
      />

      <div className="form-select-group">
        <label htmlFor="">Select Role Type</label>
        <select
          name="role"
          id=""
          className="select-box"
          onChange={onSelectChange}
        >
          <option value="0">Admin</option>
          <option value="1">User</option>
        </select>
      </div>

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
    </>
  );
};

const ManageAccessSection = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleClick = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: { title: "Add Role", body: <ModalBody /> },
    });
  };
  return (
    <div className="access-container">
      <div className="access-section">
        <div className="access-section-header">
          <h3>All Roles</h3>
          <AddButton resource="Role" handleClick={handleClick} />
        </div>
        <RoleList roles={state.users} />
      </div>
    </div>
  );
};

export default ManageAccessSection;
