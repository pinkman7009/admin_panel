import React from "react";
import RoleItem from "./RoleItem";

const RoleList = ({ roles }) => {
  return (
    <div className="role-list">
      {roles?.map((item) => {
        return <RoleItem key={item.id} role={item} />;
      })}
    </div>
  );
};

export default RoleList;
