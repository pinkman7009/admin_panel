import React, { useState } from "react";
import "../../../styles/Modal.css";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../../types/modalTypes";
import { addCategories } from "../../../actions/categoryActions";
import SaveButton from "../buttons/SaveButton";
import ViewButton from "../buttons/ViewButton";
import { useNavigate } from "react-router-dom";

const CategoriesModal = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const { value } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addCategories(form));
    dispatch({ type: CLOSE_MODAL });
    navigate("/categories");
  };
  const closeModal = () => {
    // dispatch({ type: CLOSE_MODAL, payload: null });
    navigate("/categories");
  };

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <ViewButton handleClick={closeModal} text="Go Back" />
        <h3 className="modal-title">Add Category</h3>
        <input
          name="value"
          type="text"
          placeholder="Category name"
          className="modal-input"
          value={value}
          onChange={handleChange}
        />
        <SaveButton handleClick={handleSubmit} />
      </div>
    </div>
  );
};

export default CategoriesModal;
