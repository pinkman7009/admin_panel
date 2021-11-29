import React, { useState, useEffect } from "react";
import "../../../styles/Modal.css";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../../types/modalTypes";
import ViewButton from "../buttons/ViewButton";
import { addRole, updateRole } from "../../../actions/registerAction";
import { getUserById } from "../../../actions/roleAction";
import SaveButton from "../buttons/SaveButton";
import { useNavigate, useParams } from "react-router-dom";

const CustomerDetailsModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [form, setForm] = useState({});
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const customer = await dispatch(getUserById(params.id));

      setForm(customer.data);
    };

    if (params.id) {
      fetchCustomerDetails();
      setUpdateData(true);
    }
  }, []);

  const { firstname, lastname, email, password, phone } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.role = 1;

    if (updateData === false) {
      dispatch(addRole(form));
    } else {
      dispatch(updateRole(form, params.id));
    }
    dispatch({ type: CLOSE_MODAL });
    navigate("/customerdetails");
  };

  const closeModal = () => {
    // dispatch({ type: CLOSE_MODAL, payload: null });
    navigate("/customerdetails");
  };
  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <ViewButton handleClick={closeModal} text="Go Back" />
        <h3 className="modal-title">
          {updateData === false ? "Add" : "Update"} Customer Details
        </h3>
        <input
          name="firstname"
          type="text"
          placeholder="Enter first name"
          className="modal-input"
          value={firstname}
          onChange={handleChange}
        />
        <input
          name="lastname"
          type="text"
          placeholder="Enter last name"
          className="modal-input"
          value={lastname}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          className="modal-input"
          value={email}
          onChange={handleChange}
        />
        {updateData === false && (
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            className="modal-input"
            value={password}
            onChange={handleChange}
          />
        )}

        <input
          name="phone"
          type="text"
          placeholder="Enter Number"
          className="modal-input"
          value={phone}
          onChange={handleChange}
        />
        <SaveButton handleClick={handleSubmit} />
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
