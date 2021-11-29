import React, { useState, useEffect } from "react";
import "../../../styles/Modal.css";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../../types/modalTypes";
import ViewButton from "../buttons/ViewButton";
import { register, addRole, updateRole } from "../../../actions/registerAction";
import SaveButton from "../buttons/SaveButton";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getUserById } from "../../../actions/roleAction";

const AccessModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [form, setForm] = useState({});

  const [roleType, setRoleType] = useState("0");
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await dispatch(getUserById(params.id));

      setForm(userData?.data);
    };

    if (params.id) {
      fetchUser();
      setUpdateData(true);
    }
  }, []);

  const { firstname, lastname, email, password, roleTitle } = form;
  const permissions = [];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePermissions = (e) => {
    permissions.push(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.role = 0;
    form.permissions = permissions;
    if (updateData === false) {
      dispatch(addRole(form));
    } else {
      dispatch(updateRole(form, params.id));
    }
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
        <h3 className="modal-title">
          {updateData === false ? "Add" : "Update"} Role
        </h3>
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
        {updateData === false && (
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            className="modal-input"
            value={password}
            onChange={handleChange}
          />
        )}
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
              <input
                type="checkbox"
                value="MANAGE_ACCESS"
                onChange={handlePermissions}
              />
            </div>
            <div className="checkbox-group">
              <label htmlFor="">Categories</label>
              <input
                type="checkbox"
                value="CATEGORIES"
                onChange={handlePermissions}
              />
            </div>
            <div className="checkbox-group">
              <label htmlFor="">News</label>
              <input
                type="checkbox"
                value="NEWS"
                onChange={handlePermissions}
              />
            </div>
            <div className="checkbox-group">
              <label htmlFor="">Customer Details</label>
              <input
                type="checkbox"
                value="CUSTOMER_DETAILS"
                onChange={handlePermissions}
              />
            </div>
            <div className="checkbox-group">
              <label htmlFor="">Memberships</label>
              <input
                type="checkbox"
                value="MEMBERSHIP_PLAN"
                onChange={handlePermissions}
              />
            </div>
          </div>
        ) : null}

        <SaveButton handleClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AccessModal;
