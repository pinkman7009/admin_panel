import React from "react";
import "../../../styles/CustomerDetails.css";
import CustomerDetailsList from "./CustomerDetailsList";
import { FaUser } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
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
          <div>
            <h3>Total Users</h3>
            <p>3400</p>
          </div>
          <div className="cd-stats-item-icon">
            <FaUser />
          </div>
        </div>
        <div className="cd-stats-item">
          <div>
            <h3>New Users</h3>
            <p>500</p>
          </div>
          <div className="cd-stats-item-icon">
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/bar-graph-2119073-1790556.png"
              alt=""
            />
          </div>
        </div>
        <div className="cd-stats-item">
          <div>
            <h3>Active Users</h3>
            <p>2000</p>
          </div>
          <div className="cd-stats-item-icon">
            <BiTime />
          </div>
        </div>
      </div>
      <CustomerDetailsList customers={customerDetails} />
    </div>
  );
};

export default CustomerDetailsSection;
