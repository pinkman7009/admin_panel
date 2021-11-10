import React from "react";
import "../../../styles/Memberships.css";

const MembershipItem = ({ membership }) => {
  return (
    <>
      <div className="membership-item">
        <p className="name">{membership.name}</p>
        <p className="price">${membership.price}</p>
      </div>
    </>
  );
};

export default MembershipItem;
