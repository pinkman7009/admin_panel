import React, { useEffect } from "react";
import "../../../styles/CustomerDetails.css";
import CustomerDetailsList from "./CustomerDetailsList";
import { FaUser } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../actions/roleAction";
import AddButton from "../buttons/AddButton";
import { useNavigate } from "react-router-dom";

const CustomerDetailsSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleClick = () => {
    navigate("/customerdetails/modal");
  };

  const customerDetails = state.users?.filter((item) => item.role !== 0);
  return (
    <div className="cd-container">
      <AddButton resource="User" handleClick={handleClick} />
      <div className="cd-stats">
        <div className="cd-stats-item">
          <div>
            <h3>Total Customers</h3>
            <p>{customerDetails?.length}</p>
          </div>
          <div className="cd-stats-item-icon">
            <FaUser />
          </div>
        </div>
        <div className="cd-stats-item">
          <div>
            <h3>New Customers</h3>
            <p>{customerDetails?.length}</p>
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
            <h3>Active Customers</h3>
            <p>{customerDetails?.length}</p>
          </div>
          <div className="cd-stats-item-icon">
            <BiTime />
          </div>
        </div>
      </div>
      {customerDetails && <CustomerDetailsList customers={customerDetails} />}
    </div>
  );
};

export default CustomerDetailsSection;
