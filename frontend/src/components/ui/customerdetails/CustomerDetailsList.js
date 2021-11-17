import React from "react";

const CustomerDetailsList = ({ customers }) => {
  return (
    // <div className="cd-table">
    //   <div className="cd-table-headers">
    //     <h3>ID</h3>
    //     <h3>First Name</h3>
    //     <h3>Last Name</h3>
    //     <h3>Email</h3>
    //     <h3>Phone</h3>
    //   </div>
    //   {customers.map((item) => {
    //     return (
    //       <div className="cd-table-records">
    //         <p>{item.id}</p>
    //         <p>{item.firstname}</p>
    //         <p>{item.lastname}</p>
    //         <p>{item.email}</p>
    //         <p>{item.phone}</p>
    //       </div>
    //     );
    //   })}
    // </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>

      <tbody>
        {customers.map((item) => {
          return (
            <tr>
              <td>{item.id}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomerDetailsList;
