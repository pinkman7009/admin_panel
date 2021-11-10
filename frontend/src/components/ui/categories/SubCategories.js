import React, { useState, useEffect } from "react";
import AddButton from "../buttons/AddButton";
import SubCategoriesList from "./SubCategoriesList";
import SaveButton from "../buttons/SaveButton";
import { useDispatch } from "react-redux";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../types/modalTypes";
import axios from "axios";
import { fetchCategories } from "../../../actions/categoryActions";

const ModalBody = ({ id }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({});

  const { value } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
      };

      const formData = {
        ...form,
        category: id,
      };
      const res = await axios.post("/api/subcategories", formData, config);

      dispatch(fetchCategories());
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <>
      <input
        name="value"
        type="text"
        placeholder="Subcategory name"
        className="modal-input"
        value={value}
        onChange={handleChange}
      />
      <SaveButton handleClick={handleSubmit} />
    </>
  );
};

const SubCategories = ({ id, subcategories }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: { title: "Add Subcategory", body: <ModalBody id={id} /> },
    });
  };
  return (
    <div className="subcategory-container">
      <div className="categories-list-header">
        <h4>Sub Categories</h4>
        <AddButton resource="Subcategory" handleClick={handleClick} />
      </div>
      <SubCategoriesList subcategories={subcategories} />
    </div>
  );
};

export default SubCategories;
