import React from "react";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";

const RoleList = ({ roles }) => {
  const adminRoles = roles?.filter((item) => item.role === 0);
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role Title</th>
          <th>Options</th>
        </tr>
      </thead>

      <tbody>
        {adminRoles?.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.email}</td>
              <td>{item.role === 0 ? "Admin" : "Not Admin"}</td>
              <td>
                <div className="button-group">
                  <ViewButton text="Edit" />
                  <DeleteButton text="Delete" />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RoleList;
