import React from "react";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";

const CustomerDetailsList = ({ customers }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Options</th>
        </tr>
      </thead>

      <tbody>
        {customers.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
                <div className="button-group">
                  <ViewButton text="Edit" />
                  <DeleteButton text="Delete" />
                  <DeleteButton text="Block" />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomerDetailsList;
