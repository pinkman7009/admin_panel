import React, { useState, useEffect } from "react";
import "../../../styles/Memberships.css";
import AddButton from "../buttons/AddButton";
import SaveButton from "../buttons/SaveButton";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../types/modalTypes";
import MembershipsList from "./MembershipsList";
import {
  fetchMemberships,
  addMemberships,
} from "../../../actions/membershipsAction";
import { useNavigate } from "react-router-dom";

const ModalBody = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({});

  const { name, price } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addMemberships(form));
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <>
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
    </>
  );
};

const MembershipsSection = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const state = useSelector((state) => state);
  useEffect(() => {
    if (!state.memberships) dispatch(fetchMemberships());
  }, []);

  const handleClick = () => {
    navigate("/memberships/modal");
  };
  return (
    <div className="memberships-container">
      <div className="memberships-list">
        <div className="memberships-list-header">
          <h3>Memberships</h3>

          <AddButton resource="Membership" handleClick={handleClick} />
        </div>

        <MembershipsList memberships={state.memberships} />
      </div>
    </div>
  );
};

export default MembershipsSection;
