import React from "react";

const CustomerDetailsList = ({ customers }) => {
  return (
    <div className="cd-table">
      <div className="cd-table-headers">
        <h3>ID</h3>
        <h3>Name</h3>
        <h3>Email</h3>
        <h3>Phone</h3>
      </div>
      {customers.map((item) => {
        return (
          <div className="cd-table-records">
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.phone}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerDetailsList;
