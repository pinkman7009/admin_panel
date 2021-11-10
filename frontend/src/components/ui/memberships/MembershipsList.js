import React from "react";
import MembershipItem from "./MembershipItem";
import "../../../styles/Memberships.css";

const MembershipsList = ({ memberships }) => {
  return (
    <div className="membership-grid">
      {memberships?.map((item) => {
        return <MembershipItem key={item.id} membership={item} />;
      })}
    </div>
  );
};

export default MembershipsList;
