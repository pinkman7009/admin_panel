import React, { useState } from "react";
import "../../../styles/Modal.css";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../../types/modalTypes";
import { addMemberships } from "../../../actions/membershipsAction";
import SaveButton from "../buttons/SaveButton";
import ViewButton from "../buttons/ViewButton";
import { useNavigate } from "react-router-dom";

const MembershipsModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const { name, price } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addMemberships(form));
    dispatch({ type: CLOSE_MODAL });
    navigate("/memberships");
  };
  const closeModal = () => {
    // dispatch({ type: CLOSE_MODAL, payload: null });
    navigate("/memberships");
  };

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <ViewButton handleClick={closeModal} text="Go Back" />
        <h3 className="modal-title">Add Memberships</h3>
        <input
          name="name"
          type="text"
          placeholder="Plan name"
          className="modal-input"
          value={name}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Plan price"
          className="modal-input"
          value={price}
          onChange={handleChange}
        />
        <div className="admin-access-options">
          <div className="checkbox-group">
            <label htmlFor="">Upload Video with HD Resolution</label>
            <input type="checkbox" />
          </div>
          <div className="checkbox-group">
            <label htmlFor="">Attachment & Post Scheduling</label>
            <input type="checkbox" />
          </div>
        </div>
        <SaveButton handleClick={handleSubmit} />
      </div>
    </div>
  );
};

export default MembershipsModal;
