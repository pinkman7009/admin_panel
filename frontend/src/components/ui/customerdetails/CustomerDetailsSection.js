import React from "react";
import "../../../styles/CustomerDetails.css";
import CustomerDetailsList from "./CustomerDetailsList";

const CustomerDetailsSection = () => {
  const customerDetails = [
    {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "john@gmail.com",
      phone: "+91-1234567890",
    },
    {
      id: 2,
      firstname: "John",
      lastname: "Doe",
      email: "john@gmail.com",
      phone: "+91-1234567890",
    },
    {
      id: 3,
      firstname: "John",
      lastname: "Doe",
      email: "john@gmail.com",
      phone: "+91-1234567890",
    },
    {
      id: 4,
      firstname: "John",
      lastname: "Doe",
      email: "john@gmail.com",
      phone: "+91-1234567890",
    },
    {
      id: 5,
      firstname: "John",
      lastname: "Doe",
      email: "john@gmail.com",
      phone: "+91-1234567890",
    },
  ];
  return (
    <div className="cd-container">
      <div className="cd-stats">
        <div className="cd-stats-item">
          <h3>Total Users</h3>
          <p>3400</p>
        </div>
        <div className="cd-stats-item">
          <h3>New Users</h3>
          <p>500</p>
        </div>
        <div className="cd-stats-item">
          <h3>Active Users</h3>
          <p>2000</p>
        </div>
      </div>
      <CustomerDetailsList customers={customerDetails} />
    </div>
  );
};

export default CustomerDetailsSection;
