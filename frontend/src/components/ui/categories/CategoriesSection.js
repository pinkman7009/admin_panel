import React, { useState, useEffect } from "react";
import "../../../styles/Categories.css";
import "../../../styles/Modal.css";
import CategoriesList from "./CategoriesList";
import AddButton from "../buttons/AddButton";
import SaveButton from "../buttons/SaveButton";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../types/modalTypes";
import {
  addCategories,
  fetchCategories,
} from "../../../actions/categoryActions";

const ModalBody = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({});

  const { value } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addCategories(form));
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <>
      <input
        name="value"
        type="text"
        placeholder="Category name"
        className="modal-input"
        value={value}
        onChange={handleChange}
      />
      <SaveButton handleClick={handleSubmit} />
    </>
  );
};

const CategoriesSection = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleClick = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: { title: "Add Category", body: <ModalBody /> },
    });
  };
  return (
    <div className="categories-container">
      <div className="categories-list">
        <div className="categories-list-header">
          <h3>Categories</h3>
          <AddButton resource="Category" handleClick={handleClick} />
        </div>

        <CategoriesList categories={state.categories} />
      </div>
    </div>
  );
};

export default CategoriesSection;
