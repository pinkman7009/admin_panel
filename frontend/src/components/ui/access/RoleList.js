import React from "react";
import RoleItem from "./RoleItem";

const RoleList = () => {
  const roles = [
    {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "john@gmail.com",
      role: 0,
    },
    {
      id: 2,

      firstname: "Emma",
      lastname: "Stone",
      email: "emma@gmail.com",
      role: 0,
    },
    {
      id: 3,

      firstname: "Matt",
      lastname: "Smith",
      email: "matt@gmail.com",
      role: 0,
    },
  ];
  return (
    <div className="role-list">
      {roles.map((item) => {
        return <RoleItem key={item.id} role={item} />;
      })}
    </div>
  );
};

export default RoleList;
