import React from "react";
import "../../../styles/Memberships.css";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";

const MembershipItem = ({ membership }) => {
  return (
    <>
      <div className="membership-item">
        <p className="name">{membership.name}</p>
        <ul>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
        </ul>
        <p className="price">${membership.price}</p>
        <div className="button-group">
          <ViewButton text="Edit" />
          <DeleteButton text="Delete" />
        </div>
      </div>
    </>
  );
};

export default MembershipItem;
