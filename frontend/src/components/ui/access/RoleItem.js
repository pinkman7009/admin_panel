import React from "react";

const RoleItem = ({ role }) => {
  return (
    <div className="role-item">
      <h3>
        {" "}
        {role.firstname} {role.lastname}
      </h3>
      <p>{role.email}</p>
      <p>Admin</p>
    </div>
  );
};

export default RoleItem;
