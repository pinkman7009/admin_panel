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
